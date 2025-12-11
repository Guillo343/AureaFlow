export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center flex-col gap-4 text-center px-4">

        <h1 className="text-5xl font-bold">Tu dinero, bajo control</h1>
        <p className="text-gray-600 max-w-xl">
          Organiza tus ingresos, gastos y metas financieras desde un solo lugar.
        </p>

        <button className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition">
          Empezar ahora
        </button>
      </section>
    </div>
  );
}
