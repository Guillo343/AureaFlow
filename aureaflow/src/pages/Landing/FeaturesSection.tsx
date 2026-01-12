import { motion } from "framer-motion";

const features = [
  {
    title: "Income Tracking",
    desc: "Know exactly how much you earn — every month, every source.",
  },
  {
    title: "Smart Expenses",
    desc: "See where your money goes and how every expense impacts your balance.",
  },
  {
    title: "Savings Goals",
    desc: "Set clear goals and watch your progress grow over time.",
  },
  {
    title: "Financial Insights",
    desc: "Get instant summaries that turn numbers into understanding.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-title"
      className="relative py-32 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <header className="text-center mb-20">
          <h2
            id="features-title"
            className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to stay in control
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            AureaFlow gives you the tools to understand, organize, and grow your
            finances — without complexity.
          </p>
        </header>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="
                group relative p-8 rounded-2xl
                bg-white/5 backdrop-blur
                border border-white/10
                hover:border-violet-500/40
                transition">
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover glow */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  transition
                  bg-linear-to-br
                  from-violet-500/10
                  via-transparent
                  to-transparent"/>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
