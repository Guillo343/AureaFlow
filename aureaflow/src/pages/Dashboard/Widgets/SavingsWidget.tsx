import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  savings: number;
};

export default function SavingsWidget({ savings }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate("/dashboard/savings")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        rounded-xl bg-[#151515] p-5 border border-white/10
        cursor-pointer transition">
      <p className="text-sm text-gray-400">Savings</p>

      <p className="text-2xl font-semibold mt-2">
        ${savings.toLocaleString()}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Available balance
      </p>
    </motion.div>
  );
}
