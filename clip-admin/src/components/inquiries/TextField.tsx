import type { FC } from "react";

type TextFieldProps = {
  label: string;
  value?: string;
};

const TextField: FC<TextFieldProps> = ({ label, value }) => (
  <div>
    <p className="mb-1 text-sm font-medium text-(--text)">{label}</p>
    <p className="text-(--text-h)">{value || "—"}</p>
  </div>
);

export default TextField;
