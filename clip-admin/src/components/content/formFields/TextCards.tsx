import type { FC } from "react";
import Field from "./Field";

type Step = {
  description: string;
  title: string;
};

type TextCardsProps = {
  title: string;
  items: Step[];
  onChange: (value: Step[]) => void;
};

const TextCards: FC<TextCardsProps> = ({ items, onChange, title }) => {
  const handleChange = (key: keyof Step, value: string, index: number) => {
    const item = { ...items[index], [key]: value };
    const updatedItems = items.with(index, item);
    onChange(updatedItems);
  };
  return (
    <div className="grid gap-3">
      <h4 className="font-semibold text-(--text-h)">{title}</h4>

      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="grid gap-3 rounded-xl border border-(--border) bg-(--bg) p-4"
        >
          <Field
            label={`Title ${index + 1}`}
            value={item.title}
            onChange={(value) => handleChange("title", value, index)}
          />
          <Field
            label={`Title ${index + 1}`}
            value={item.description}
            onChange={(value) => handleChange("description", value, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default TextCards;
