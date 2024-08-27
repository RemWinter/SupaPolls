export interface Poll {
  id: string; // uuid
  title: string; // text
  created_at: string; // ISO string format of the date
}

export interface Vote {
  id: string; // uuid
  poll_id: string; // Foreign key referencing `Poll.id`
  option: string; // The voting option
  created_at: string; // ISO string format of the date
}

export interface User {
  id: string; // uuid
  email: string; // text
  created_at: string; // ISO string format of the date
}
