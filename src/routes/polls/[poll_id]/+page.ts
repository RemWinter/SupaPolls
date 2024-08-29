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
    let res: any = await fetchPollById(poll_id, false);

    // Return the data as expected by the page
    return {
        poll: res.pollData,
        error: null,
        status: 200
    };
  } catch (error) {
    // Handle error, return a consistent structure
    return {
      status: 500,
      error: new Error('Failed to load poll data'),
      poll: null
    };
  }
};
