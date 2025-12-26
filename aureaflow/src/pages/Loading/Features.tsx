import { motion } from "framer-motion";

const features = [
  { title: "Track Expenses", desc: "Understand where your money goes with smart categorization." },
  { title: "Set Goals", desc: "Create saving targets and watch your progress grow." },
  { title: "Visual Insights", desc: "Clear charts that help you make better decisions." }
];

export default function Features() {
  return (
    <section className="py-32 container-main">
      <h2 className="text-4xl font-bold text-center mb-16">What You Can Do</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f, idx) => (
          <motion.div
            key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.6, ease: "easeOut" }} className="bg-[#151515] p-8 rounded-2xl shadow-soft hover-lift hover-scale-sm">
            <h3 className="text-2xl font-semibold mb-2 text-indigo-300">{f.title}</h3>
            <p className="opacity-75">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
