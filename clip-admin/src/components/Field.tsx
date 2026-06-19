import type { FC } from "react";

type FieldProps = {
  label: string;
  value?: string;
};

const Field: FC<FieldProps> = ({ label, value }) => (
  <div>
    <p className="mb-1 text-sm font-medium text-[var(--text)]">{label}</p>
    <p className="text-[var(--text-h)]">{value || "—"}</p>
  </div>
);

export default Field;
