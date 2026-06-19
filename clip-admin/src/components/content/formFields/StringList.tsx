import type { FC } from "react";
import Field from "./Field";

type StringListProps = {
  title: string;
  items: string[];
  onChange: (value: string[]) => void;
};

const StringList: FC<StringListProps> = ({ items, onChange, title }) => {
  const handleChange = (value: string, index: number) => {
    onChange(items.with(index, value));
  };

  return (
    <div className="grid gap-3">
      <h4 className="font-semibold text-(--text-h)">{title}</h4>

      {items.map((item, index) => (
        <Field
          key={`${title}-${index}`}
          label={`${title} ${index + 1}`}
          value={item}
          onChange={(value) => handleChange(value, index)}
        />
      ))}
    </div>
  );
};

export default StringList;
