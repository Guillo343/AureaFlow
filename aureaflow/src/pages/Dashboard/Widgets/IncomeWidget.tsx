import { useNavigate } from "react-router-dom";

export default function IncomeWidget({ total }: { total: number }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard/income")}
      className="widget-card"
    >
      <p className="widget-title">Income</p>
      <p className="widget-value">${total}</p>
      <p className="widget-sub">This month</p>
    </div>
  );
}
