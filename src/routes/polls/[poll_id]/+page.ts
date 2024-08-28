import { fetchPollById, fetchVoteCounts } from '$lib/polls';
import { supabase } from '$lib/supabaseClient';
import type { Poll, Option, FetchPollResult } from '$lib/types';
import { fetchUser, user } from '$lib/users';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { poll_id } = params;
  
  await fetchUser();
  let userId: string | undefined;

  user.subscribe(value => {
    userId = value?.id;
  })();

  try {
    // Fetch the poll data and options
    let props: FetchPollResult = await fetchPollById(poll_id, userId);
    
    // Fetch the vote counts and update options
    const optionsWithVoteCount = await fetchVoteCounts(poll_id, props.options);

    // Return the data as expected by the page
    return {
        poll: props.poll,
        options: optionsWithVoteCount
    };
  } catch (error) {
    // Handle error, return a consistent structure
    return {
      status: 500,
      error: new Error('Failed to load poll data'),
      props: {
        poll: null, // or provide a default structure if `poll` can't be null
        options: [],
      }
    };
  }
};
