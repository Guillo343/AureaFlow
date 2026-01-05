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
  title: string;
  amount: number;
  type: "monthly" | "variable" | "one_time";
  created_at: string;
};