import { supabase } from '$lib/supabaseClient';
import type { Poll, VoteData } from './types';
import { user, fetchUser } from './users';

// Function to create a new poll
export async function createPoll(title: string, options: string[], isPublic: boolean): Promise<void> {
  fetchUser()
  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  // Insert poll into Polls table
  const { data: pollData, error: pollError } = await supabase
    .from('Polls')
    .insert([{ title: title, visibility: isPublic ? 'public' : 'private' }])
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
      .from('Options')
      .insert(optionsToInsert);

    if (optionsError) {
      console.error('Error creating poll options:', optionsError);
      return;
    }
  }
}

export async function vote(optionId: string, poll: Poll, options: any[]): Promise<{ error?: any }> {
  await fetchUser();
  
  const { data, error } = await supabase
    .from('Votes')
    .insert([{ poll_id: poll?.id, option_id: optionId }]); // Ensure user.id is available

  if (error) {
    console.error('Error submitting vote:', error.message);
    return { error };
  }

  // Update the options array with the new vote count
  options = options.map(option => 
    option.id === optionId ? { ...option, count: option.count + 1 } : option
  );

  return {}; // Return an empty object if there’s no error
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
    count: item.vote_count, // Map vote_count to count
  }));

  return mappedData;
}