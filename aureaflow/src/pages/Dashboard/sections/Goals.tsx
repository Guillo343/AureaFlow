import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Goal } from "../../../features/auth/finances/types";
import { getGoals, createGoal, deleteGoal} from "../../../features/auth/finances/goals.service";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    try {
      const data = await getGoals();
      setGoals(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!title || target <= 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createGoal({
      user_id: user.id, 
      title,
      target_amount: target,
      current_amount: 0,
      priority: goals.length + 1,
      deadline: null,
    });

    setTitle("");
    setTarget(0);
    loadGoals();
  }

  async function handleDelete(id: number) {
    await deleteGoal(id);
    loadGoals();
  }

  if (loading) return <div>Loading goals...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Goals</h1>

      {/* Create */}
      <div className="flex gap-2">
        <input
          className="bg-black border px-3 py-2"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="bg-black border px-3 py-2"
          placeholder="Target amount"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-violet-600 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">{goal.title}</p>
              <p className="text-sm text-gray-400">
                ${goal.current_amount} / ${goal.target_amount}
              </p>
            </div>

            <button
              onClick={() => handleDelete(goal.id)}
              className="text-red-400 hover:text-red-600 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
