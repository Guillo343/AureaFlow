import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Free to Use" },
  { value: "0%", label: "Complexity" },
  { value: "24/7", label: "Access Anywhere" },
  { value: "1", label: "Unified Dashboard" },
];

export default function StatsSection() {
  return (
    <section className="py-24 px-6 w-full bg-blue-600 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-4xl font-bold">{s.value}</h3>
            <p className="text-lg opacity-90">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
