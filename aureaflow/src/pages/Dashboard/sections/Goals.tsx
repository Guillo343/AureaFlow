import { useEffect, useState } from "react";
import { getGoals } from "../../../features/auth/finances/goals.service";

export default function Goals() {
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    getGoals().then(setGoals);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Savings Goals</h1>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-[#151515] p-4 rounded-xl border border-white/10"
          >
            <p className="font-medium">{goal.title}</p>
            <p className="text-sm text-gray-400">
              ${goal.current_amount} / ${goal.target_amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
