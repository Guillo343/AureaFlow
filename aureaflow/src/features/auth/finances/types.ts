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
