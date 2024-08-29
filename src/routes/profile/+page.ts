import { fetchPollById, fetchVoteCounts, getPollsByUserId } from '$lib/polls';
import { supabase } from '$lib/supabaseClient';
import type { Poll, Option, FetchPollResult } from '$lib/types';
import { fetchUser, user } from '$lib/users';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  
  await fetchUser();
  let userId: string | undefined;

  user.subscribe(value => {
    userId = value?.id;
  })();

  try {
    const allPolls = await getPollsByUserId(userId)
    
    return {
      allPolls
    }
  } catch (e) {
    return {
      status: 500,
      error: new Error('Failed to load polls data'),
      props: []
    };
  }


};
