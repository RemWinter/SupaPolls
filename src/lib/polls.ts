import { supabase } from '$lib/supabaseClient';
import type { PostgrestError } from '@supabase/supabase-js';
import type { FetchPollResult, Option, Poll, VoteData } from './types';
import { user, fetchUser } from './users';

// Function to create a new poll
export async function createPoll(title: string, description: string, options: string[], isPublic: boolean): Promise<void> {
  fetchUser()
  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  // Insert poll into Polls table
  const { data: pollData, error: pollError } = await supabase
    .from('polls')
    .insert([{ title: title, description: description, visibility: isPublic ? 'public' : 'private' }])
    .select()
    .single();

  if (pollError) {
    console.error('Error creating poll:', pollError);
    return;
  }

  // Insert options into Options table
  if (pollData) {
    const pollId = pollData.id;

    const optionsToInsert = options.map(option => ({
      poll_id: pollId,
      option
    }));

    const { data: optionsData, error: optionsError } = await supabase
      .from('options')
      .insert(optionsToInsert);

    if (optionsError) {
      console.error('Error creating poll options:', optionsError);
      return;
    }
  }
}

export async function vote(optionId: string, poll: Poll, options: any[]) { 
  await fetchUser();
  let userId: string | undefined;

  user.subscribe(value => {
    userId = value?.id;
  })();

  if (!userId) {
    return new Error('User not authenticated');
  }

  // Check if the user has already voted in this poll
  const { data: existingVote, error: voteCheckError } = await supabase
    .from('votes')
    .select('id')
    .eq('poll_id', poll.id)
    .eq('user_id', userId)
    .maybeSingle();

  if (voteCheckError && voteCheckError.code !== 'PGRST101') {
    console.error('Error checking existing vote:', voteCheckError.message);
    return voteCheckError;
  }

  if (existingVote) {
    // Delete the existing vote
    const { error: deleteError } = await supabase
      .from('votes')
      .delete()
      .eq('id', existingVote.id);

    if (deleteError) {
      console.error('Error deleting existing vote:', deleteError.message);
      return deleteError;
    }
  }

  // Insert the new vote
  const { data, error } = await supabase
    .from('votes')
    .insert([{ poll_id: poll.id, option_id: optionId, user_id: userId }]);

  if (error) {
    console.error('Error submitting vote:', error.message);
    return error;
  }

  const res = await fetchPollById(poll.id, false)

  return res.pollData;
}

export async function getOptionIdsByPoll(pollId: string): Promise<string[] | null> {
  const { data, error } = await supabase.rpc('get_option_ids_by_poll', { poll_id_input: pollId });

  if (error) {
    console.error('Error fetching option IDs:', error);
    return null;
  }

  return data as string[];
}

export async function getVoteCountsByOptions(optionIds: string[]): Promise<VoteData[] | null> {
  const { data, error } = await supabase.rpc('get_vote_counts_by_options', {
    option_ids_input: optionIds,
  });

  if (error) {
    console.error('Error fetching vote counts:', error);
    return null;
  }

  // Map 'vote_count' to 'count' and return the new structure
  const mappedData: VoteData[] = data.map((item: { option_id: string; vote_count: number }) => ({
    option_id: item.option_id,
    count: item.vote_count,
  }));

  return mappedData;
}

export async function fetchPollById(poll_id: string, dataOnly: boolean) {
  try {
    const { data: pollData, error: pollError } = await supabase
      .from('polls')
      .select(`
        *,
        options(
          *,
          votes(user_id)
        )
      `)
      .eq('id', poll_id)
      .single();

    if (pollError || !pollData) {
      console.error('Error fetching poll:', pollError?.message || 'Poll not found');
      return {
        poll: null,
        status: 404,
        error: new Error('Poll not found')
      };
    }

    if (dataOnly) return pollData

    return {
      pollData,
      status: 200,
      error: null,
    };

  } catch (error) {
    console.error('Unexpected error:', (error as Error).message);
    return {
      poll: null,
      status: 500,
      error: new Error('Unexpected error occurred'),
    };
  }
}

interface OptionWithVoteCount extends Option {
  vote_count: number;
}

export async function fetchVoteCounts(pollData: Poll, options: Option[]) { 
  try {
    const optionIds: string[] = pollData.options.map((option: any) => option.id);
  
    if (optionIds) {
      const voteData = await getVoteCountsByOptions(optionIds);
  
      if (voteData) {
        options = options.map(option => {
          const voteCount = voteData.find(vote => vote.option_id === option.id);
          return {
            ...option,
            vote_count: voteCount ? voteCount.count : 0
          };
        });
      } else {
        console.error('Failed to load vote counts');
      }
      return options
    } else {
      throw new Error('Failed to load option IDs')
    }
  } catch (e) {
    return e as Error
  }
}

export const getPollsByUserId = async (userId: string | undefined) => {

  const { data: pollData, error: pollError } = await supabase
    .from('polls')
    .select(`
      *,
      options(*, votes(*))
    `)
    .eq('user_id', userId);

    if (pollError || !pollData) {
      console.error('Error fetching poll:', pollError?.message || 'Poll not found');
      
    }

    return pollData
}