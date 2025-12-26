import { motion } from "framer-motion";

const steps = [
  { step: "1", text: "Create your account securely." },
  { step: "2", text: "Add salary, expenses, and goals." },
  { step: "3", text: "Track and grow your savings." },
];

export default function StepsSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-6 border rounded-xl bg-white shadow-sm">
            <span className="text-4xl font-bold text-blue-600">{s.step}</span>
            <p className="mt-4 text-gray-600">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
