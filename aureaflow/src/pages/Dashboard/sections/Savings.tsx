import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Saving } from "../../../features/auth/finances/types";
import {getSavings, createSaving, deleteSaving} from "../../../features/auth/finances/savings.service";

export default function Savings() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavings();
  }, []);

  async function loadSavings() {
    try {
      const data = await getSavings();
      setSavings(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!name || amount < 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newSaving = await createSaving({
      user_id: user.id,
      name,
      current_amount: amount,
    });

    setSavings((prev) => [newSaving, ...prev]);
    setName("");
    setAmount(0);
  }

  async function handleDelete(id: number) {
    await deleteSaving(id);
    setSavings((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) return <div>Loading savings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Savings</h1>

      {/* Create */}
      <div className="flex gap-2">
        <input
          className="bg-black border px-3 py-2"
          placeholder="Saving name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="bg-black border px-3 py-2"
          placeholder="Initial amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
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
        {savings.map((saving) => (
          <div
            key={saving.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">{saving.name}</p>
              <p className="text-sm text-gray-400">
                ${saving.current_amount}
              </p>
            </div>

            <button
              onClick={() => handleDelete(saving.id)}
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
