import type { FC } from "react";

type TextAreaProps = { label: string; value?: string };

const TextArea: FC<TextAreaProps> = ({ label, value = "" }) => {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-(--text-h)">{label}</span>
      <textarea
        value={value}
        readOnly
        rows={4}
        className="rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text-h)"
      />
    </label>
  );
};

export default TextArea;
