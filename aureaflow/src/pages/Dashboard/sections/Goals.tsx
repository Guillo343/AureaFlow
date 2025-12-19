export default function Goals() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Savings Goals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal Card */}
        <div className="bg-[#151515] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-2">Emergency Fund</h3>

          <p className="text-sm text-gray-400 mb-4">
            $4,200 / $3,000
          </p>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-600"
              style={{ width: "40%" }}
            />
          </div>
        </div>

        {/* Future: map goals here */}
      </div>
    </div>
  );
}
