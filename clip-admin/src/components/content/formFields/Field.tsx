import type { FC } from "react";

type FieldProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

const Field: FC<FieldProps> = ({ label, value = "", onChange }) => {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-(--text-h)">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text-h)"
      />
    </label>
  );
};

export default Field;
