import { motion } from "framer-motion";

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedContainer({
  children,
  delay = 0,
  className = "",
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
