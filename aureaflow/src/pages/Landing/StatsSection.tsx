import { motion } from "framer-motion";

const stats = [
  {
    value: "Real-time",
    label: "Always up-to-date expenses",
  },
  {
    value: "Privacy-first",
    label: "Your financial data stays yours",
  },
  {
    value: "Goal-driven",
    label: "Savings with clear direction",
  },
  {
    value: "One place",
    label: "All your finances, unified",
  },
];

export default function StatsSection() {
  return (
    <section
      aria-labelledby="stats-title"
      className="py-20 px-6 w-full"
    >
      <h2 id="stats-title" className="sr-only">
        Product highlights
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col gap-2">
            <span className="text-xl md:text-2xl font-semibold">
              {s.value}
            </span>
            <span className="text-sm text-gray-400">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
