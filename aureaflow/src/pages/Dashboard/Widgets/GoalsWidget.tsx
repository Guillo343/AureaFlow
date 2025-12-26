import type { Goal } from "../../../features/auth/finances/types";
import { useNavigate } from "react-router-dom";

export default function GoalsWidget({ goals }: { goals: Goal[] }) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl bg-[#151515] p-5 border border-white/10 cursor-pointer"
      onClick={() => navigate("/dashboard/goals")}>
      <p className="text-sm text-gray-400">Goals</p>

      <p className="text-xl font-semibold mt-2">
        {goals.length} active
      </p>

      <div className="mt-3 space-y-1">
        {goals.slice(0, 3).map((goal) => (
          <p key={goal.id} className="text-sm text-gray-300 truncate">
            {goal.title}
          </p>
        ))}
      </div>
    </div>
  );
}
