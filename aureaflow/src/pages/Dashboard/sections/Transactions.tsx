export default function Transactions() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      <div className="bg-[#151515] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {/* Mock row */}
            <tr className="border-t border-white/5 hover:bg-white/5 transition">
              <td className="px-4 py-3">2025-01-10</td>
              <td className="px-4 py-3">Expense</td>
              <td className="px-4 py-3">Food</td>
              <td className="px-4 py-3 text-right text-red-400">
                -$25.00
              </td>
            </tr>

            {/* Empty state ready */}
            {/* Map supabase data here later */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
