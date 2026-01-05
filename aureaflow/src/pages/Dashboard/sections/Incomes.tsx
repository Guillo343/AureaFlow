import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Income } from "../../../features/auth/finances/types";
import {getIncomes,createIncome,deleteIncome} from "../../../features/auth/finances/incomes.service";

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
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
    if (!category || amount <= 0 || !date) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newIncome = await createIncome({
      user_id: user.id,
      category,
      amount,
      date,
      note: note || null,
    });

    // Optimistic UI (mejor UX)
    setIncomes((prev) => [newIncome, ...prev]);

    setCategory("");
    setAmount(0);
    setDate("");
    setNote("");
  }

  async function handleDelete(id: number) {
    await deleteIncome(id);
    setIncomes((prev) => prev.filter((i) => i.id !== id));
  }

  if (loading) return <div>Loading incomes...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Incomes</h1>

      {/* Create income */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          className="bg-black border px-3 py-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}/>

        <input
          type="number"
          className="bg-black border px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}/>

        <input
          type="date"
          className="bg-black border px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}/>

        <input
          className="bg-black border px-3 py-2"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}/>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-violet-600 rounded hover:bg-violet-500 transition">
          Add
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {incomes.map((income) => (
          <div
            key={income.id}
            className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{income.category}</p>
              <p className="text-sm text-gray-400">
                ${income.amount} · {income.date}
              </p>
              {income.note && (
                <p className="text-xs text-gray-500 mt-1">
                  {income.note}
                </p>
              )}
            </div>

            <button
              onClick={() => handleDelete(income.id)}
              className="text-red-400 hover:text-red-600 transition">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
