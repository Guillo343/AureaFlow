export type Goal = {
  id: number;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  priority: number;
  created_at: string;
};
export type Income = {
  id: number;
  user_id: string;
  category: string;
  amount: number;
  date: string;
  note: string | null;
  created_at: string;
};
export type Saving = {
  id: number;
  user_id: string;
  name: string;
  current_amount: number;
  created_at: string;
};
