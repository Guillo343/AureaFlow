import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Income } from "../../../features/auth/finances/types";
import {getIncomes, createIncome, deleteIncome} from "../../../features/auth/finances/incomes.service";

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<Income["type"]>("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncomes();
  }, []);

  async function loadIncomes() {
    try {
      const data = await getIncomes();
      setIncomes(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!title || amount <= 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createIncome({
      user_id: user.id,
      title,
      amount,
      type,
    });

    setTitle("");
    setAmount(0);
    setType("monthly");
    loadIncomes();
  }

  async function handleDelete(id: number) {
    await deleteIncome(id);
    loadIncomes();
  }

  const totalIncome = incomes.reduce((acc, inc) => acc + inc.amount, 0);

  if (loading) return <div>Loading incomes...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Income</h1>
        <p className="text-sm text-gray-400">
          Track where your money comes from
        </p>
      </div>

      {/* Summary */}
      <div className="p-4 border rounded-lg bg-black/30">
        <p className="text-sm text-gray-400">Total income</p>
        <p className="text-2xl font-bold">${totalIncome}</p>
      </div>

      {/* Create */}
      <div className="flex flex-wrap gap-2">
        <input
          className="bg-black border px-3 py-2 rounded w-full sm:w-auto"
          placeholder="Income title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="bg-black border px-3 py-2 rounded w-full sm:w-auto"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select
          className="bg-black border px-3 py-2 rounded w-full sm:w-auto"
          value={type}
          onChange={(e) => setType(e.target.value as Income["type"])}
        >
          <option value="monthly">Monthly</option>
          <option value="variable">Variable</option>
          <option value="one_time">One-time</option>
        </select>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-violet-600 rounded hover:bg-violet-500 transition"
        >
          Add income
        </button>
      </div>

      {/* List */}
      {incomes.length === 0 ? (
        <div className="text-gray-400 text-sm">
          No incomes yet. Add your first one 💸
        </div>
      ) : (
        <div className="grid gap-3">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{income.title}</p>
                <p className="text-sm text-gray-400 capitalize">
                  {income.type}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold">${income.amount}</p>
                <button
                  onClick={() => handleDelete(income.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
