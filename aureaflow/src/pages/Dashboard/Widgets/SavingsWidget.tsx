import { useNavigate } from "react-router-dom";

export default function SavingsWidget({ savings }: { savings: number }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard/savings")}
      className="widget-card"
    >
      <p className="widget-title">Savings</p>
      <p className="widget-value">${savings}</p>
      <p className="widget-sub">Available</p>
    </div>
  );
}
