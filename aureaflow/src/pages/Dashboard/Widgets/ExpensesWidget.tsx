import { useNavigate } from "react-router-dom";

export default function ExpensesWidget({ total }: { total: number }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard/transactions")}
      className="widget-card"
    >
      <p className="widget-title">Expenses</p>
      <p className="widget-value">${total}</p>
      <p className="widget-sub">This month</p>
    </div>
  );
}
