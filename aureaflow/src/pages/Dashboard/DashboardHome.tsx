import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../features/auth/finances/dashboard.service";

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<{
    totalIncome: number;
    totalExpenses: number;
    goals: any[];
  } | null>(null);

  useEffect(() => {
  let mounted = true;

  async function loadDashboard() {
    try {
      const data = await getDashboardSummary();
      if (mounted) setSummary(data);
    } catch (err) {
      console.error("Dashboard error:", err);
      if (mounted) setSummary(null);
    } finally {
      if (mounted) setLoading(false);
    }
  }

  loadDashboard();

  return () => {
    mounted = false;
  };
}, []);


  if (loading) return <div>Loading dashboard...</div>;

  if (!summary) return <div>Error loading data</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Income" value={`$${summary.totalIncome}`} />
        <Card title="Total Expenses" value={`$${summary.totalExpenses}`} />
        <Card
          title="Savings"
          value={`$${summary.totalIncome - summary.totalExpenses}`}
        />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#151515] p-5 border border-white/10">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
