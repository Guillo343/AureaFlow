import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Expense } from "../../../features/auth/finances/types";
import {getExpenses, createExpense, deleteExpense} from "../../../features/auth/finances/expenses.service";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"fixed" | "variable">("variable");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data = await getExpenses(user.id);
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!amount || !category || !date) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await createExpense({
      user_id: user.id,
      amount,
      category,
      type,
      date,
      note: note || null,
    });

    // reset form
    setAmount(0);
    setCategory("");
    setType("variable");
    setDate("");
    setNote("");

    loadExpenses();
  }

  async function handleDelete(id: number) {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) {
    return <div className="text-gray-400">Loading expenses...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Expenses</h1>

      {/* Create Expense */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          type="number"
          placeholder="Amount"
          className="bg-black border px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}/>

        <input
          placeholder="Category"
          className="bg-black border px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}/>

        <select
          className="bg-black border px-3 py-2"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "fixed" | "variable")
          }>
          <option value="fixed">Fixed</option>
          <option value="variable">Variable</option>
        </select>

        <input
          type="date"
          className="bg-black border px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}/>

        <input
          placeholder="Note (optional)"
          className="bg-black border px-3 py-2 md:col-span-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}/>

        <button
          onClick={handleCreate}
          className="bg-violet-600 hover:bg-violet-700 transition rounded px-4 py-2 md:col-span-6">
          Add Expense
        </button>
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center p-4 border border-white/10 rounded-lg">
            <div>
              <p className="font-medium">
                {expense.category}{" "}
                <span className="text-xs text-gray-400">
                  ({expense.type})
                </span>
              </p>
              <p className="text-sm text-gray-400">
                {expense.date}
                {expense.note && ` · ${expense.note}`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                ${expense.amount.toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(expense.id)}
                className="text-red-400 hover:text-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}

        {expenses.length === 0 && (
          <p className="text-gray-500 text-sm">
            No expenses yet.
          </p>
        )}
      </div>
    </div>
  );
}
