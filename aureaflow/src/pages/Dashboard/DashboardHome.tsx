export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">
          Welcome back, Guillermo
        </h1>
        <p className="text-gray-400">
          Here’s your financial overview
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" value="$4,250" />
        <StatCard title="Monthly Income" value="$2,100" />
        <StatCard title="Monthly Expenses" value="$1,420" />
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#151515] border border-white/10 rounded-xl p-6">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
