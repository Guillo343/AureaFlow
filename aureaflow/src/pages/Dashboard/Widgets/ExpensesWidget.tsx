import { useNavigate } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";

type ExpensesWidgetProps = {
  total?: number;
  fixed?: number;
  variable?: number;
};

export default function ExpensesWidget({
  total = 0,
  fixed = 0,
  variable = 0,
}: ExpensesWidgetProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard/expenses")}
      className="rounded-xl bg-[#151515] p-5 border border-white/10
                 cursor-pointer hover:border-violet-500/40 transition"
    >
      {/* Title */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <ArrowDownRight size={16} />
        <span>Expenses</span>
      </div>

      {/* Total */}
      <p className="text-2xl font-semibold mt-2">
        ${total.toLocaleString()}
      </p>

      {/* Breakdown */}
      <div className="mt-3 space-y-1 text-sm">
        <p className="text-gray-400">
          Fixed:{" "}
          <span className="text-gray-200">
            ${fixed.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-400">
          Variable:{" "}
          <span className="text-gray-200">
            ${variable.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}
