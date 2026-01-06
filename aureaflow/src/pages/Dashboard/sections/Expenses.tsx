import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import type { Expense } from "../../../features/auth/finances/types";
import {getExpenses, createExpense, deleteExpense} from "../../../features/auth/finances/expenses.service";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"fixed" | "variable">("variable");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function handleCreate() {
    if (!amount || !category || !date) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newExpense = await createExpense({
      user_id: user.id,
      amount,
      category,
      type,
      date,
      note: note || null,
    });

    setExpenses((prev) => [newExpense, ...prev]);

    setAmount(0);
    setCategory("");
    setType("variable");
    setDate("");
    setNote("");
  }

  async function handleDelete(id: number) {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Expenses</h1>

      {/* Create */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          type="number"
          placeholder="Amount"
          className="bg-black border px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <input
          placeholder="Category"
          className="bg-black border px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select
          className="bg-black border px-3 py-2"
          value={type}
          onChange={(e) =>
            setType(e.target.value as "fixed" | "variable")
          }
        >
          <option value="variable">Variable</option>
          <option value="fixed">Fixed</option>
        </select>

        <input
          type="date"
          className="bg-black border px-3 py-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-violet-600 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">
                ${expense.amount} · {expense.category}
              </p>
              <p className="text-sm text-gray-400">
                {expense.type} · {expense.date}
              </p>
            </div>

            <button
              onClick={() => handleDelete(expense.id)}
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
