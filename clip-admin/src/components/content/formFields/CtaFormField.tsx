import type { FC } from "react";
import type { CtaLink } from "../../../../../shared/types/RootContent";
import Field from "./Field";

type CtaFormFieldProps = {
  label: string;
  value: CtaLink;
  onChange: (value: CtaLink) => void;
};

const CtaFormField: FC<CtaFormFieldProps> = ({ label, value, onChange }) => {
  const handleChange = (field: keyof CtaLink, nextValue: string) => {
    onChange({
      ...value,
      [field]: nextValue,
    });
  };

  return (
    <div className="grid gap-3 rounded-xl border border-(--border) bg-(--bg) p-4">
      <h4 className="font-semibold text-(--text-h)">{label}</h4>

      <Field
        label="Label"
        value={value.label}
        onChange={(nextValue) => handleChange("label", nextValue)}
      />

      <Field
        label="Link"
        value={value.href}
        onChange={(nextValue) => handleChange("href", nextValue)}
      />
    </div>
  );
};

export default CtaFormField;
