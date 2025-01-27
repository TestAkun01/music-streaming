interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
  <div className="card bg-zinc-900">
    <div className="card-body">
      <div className="flex justify-between">
        <div>
          <h3 className="text-zinc-400 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-zinc-100">{value}</p>
          {change !== undefined && (
            <span
              className={`text-sm ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          )}
        </div>
        <div className="text-orange-500">{icon}</div>
      </div>
    </div>
  </div>
);

export default StatCard;
