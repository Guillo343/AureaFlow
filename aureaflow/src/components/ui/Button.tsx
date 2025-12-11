import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-xl font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-md hover:shadow-lg",
    ghost:
      "text-gray-700 hover:bg-gray-100",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
