import { useEffect, useState } from "react";
import type { Goal } from "../../../features/auth/finances/types";
import {getGoals, createGoal, deleteGoal} from "../../../features/auth/finances/goals.service";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState(0);

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    const data = await getGoals();
    setGoals(data);
  }

  async function handleCreate() {
    await createGoal({
      name,
      target_amount: target,
      current_amount: 0,
      priority: goals.length + 1,
    });
    setName("");
    setTarget(0);
    loadGoals();
  }

  async function handleDelete(id: string) {
    await deleteGoal(id);
    loadGoals();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Goals</h1>

      {/* Create */}
      <div className="flex gap-2">
        <input
          className="bg-black border px-3 py-2"
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="bg-black border px-3 py-2"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">{goal.name}</p>
              <p className="text-sm text-gray-400">
                ${goal.current_amount} / ${goal.target_amount}
              </p>
            </div>

            <button
              onClick={() => handleDelete(goal.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
