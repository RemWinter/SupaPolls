import type { User as SupabaseUser } from '@supabase/auth-js';
export interface Poll {
  id: string; // uuid
  title: string; // text
  created_at: string; // ISO string format of the date
  user_id: string; // uuid
  visibility: string // 'public' || 'private'
}

export interface Vote {
  id: string; // uuid
  poll_id: string; // Foreign key referencing `Poll.id`
  option: string; // The voting option
  created_at: string; // ISO string format of the date
}


export type User = SupabaseUser;


export interface VoteData {
  option_id: string;
  count: number;
}

export interface PieChartData {
  id: string
  option: string;
  vote_count: number;
}
