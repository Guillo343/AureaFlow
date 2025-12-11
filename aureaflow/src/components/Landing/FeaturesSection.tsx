import { motion } from "framer-motion";

const features = [
  { title: "Income Tracking", desc: "Track monthly salary and variable income easily." },
  { title: "Smart Expenses", desc: "Add expenses and watch your budget update live." },
  { title: "Savings Goals", desc: "Plan goals and record real saving progress." },
  { title: "Financial Insights", desc: "Get calculated insights about your money." },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Features</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
