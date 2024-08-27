// src/routes/polls/[poll_id]/+page.ts

import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from './$types';

type Poll = { id: string; title: string };
type Option = { option: string };

export const load: PageLoad = async ({ params }) => {
  const { poll_id } = params;

  try {
    // Fetch poll details
    const { data: pollData, error: pollError } = await supabase
      .from('Polls')
      .select('*')
      .eq('id', poll_id)
      .single();

    console.log('Poll Data:', pollData);
    console.error('Poll Error:', pollError);

    if (pollError || !pollData) {
      console.error('Error fetching poll:', pollError?.message || 'Poll not found');
      return {
        status: 404,
        error: new Error('Poll not found')
      };
    }

    // Fetch poll options
    const { data: optionsData, error: optionsError } = await supabase
      .from('Options')
      .select('*')
      .eq('poll_id', poll_id);

    console.log('Options Data:', optionsData);
    console.error('Options Error:', optionsError);

    if (optionsError) {
      console.error('Error fetching poll options:', optionsError.message);
      return {
        status: 500,
        error: new Error('Error fetching poll options')
      };
    }
    return {
      props: {
        poll: pollData as Poll,
        options: optionsData as Option[]
      }
    };

  } catch (error) {
    console.error('Unexpected error:', error.message);
    return {
      status: 500,
      error: new Error('Unexpected error occurred')
    };
  }
};
