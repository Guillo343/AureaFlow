import { useNavigate } from "react-router-dom";

export default function GoalsWidget({ goals }: { goals: any[] }) {
  const navigate = useNavigate();

  const activeGoals = goals?.length ?? 0;

  return (
    <div
      onClick={() => navigate("/dashboard/goals")}
      className="widget-card"
    >
      <p className="widget-title">Goals</p>
      <p className="widget-value">{activeGoals}</p>
      <p className="widget-sub">Active goals</p>
    </div>
  );
}
