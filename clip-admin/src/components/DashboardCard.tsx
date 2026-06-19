import type { FC } from "react";

type DashboardProps = {
  label: string;
  value: string;
};

const DashboardCard: FC<DashboardProps> = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-5 shadow-(--shadow)">
      <p className="text-sm text-(--text)">{label}</p>

      <p className="mt-2 text-3xl font-bold text-(--text-h)">{value}</p>
    </div>
  );
};

export default DashboardCard;
