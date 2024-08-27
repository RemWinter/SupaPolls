import { supabase } from '$lib/supabaseClient';
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

    console.log('Poll created:', pollData);
    console.log('Options created:', optionsData);
  }
}
