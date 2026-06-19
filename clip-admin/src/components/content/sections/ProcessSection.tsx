import type { FC } from "react";
import type {
  ProcessContent,
  ProcessStep,
} from "../../../../../shared/types/RootContent";
import Field from "../formFields/Field";
import TextArea from "../formFields/TextArea";
import TextCards from "../formFields/TextCards";

type ProcessSectionProps = {
  section: ProcessContent;
  onChange: (value: ProcessContent) => void;
};

const ProcessSection: FC<ProcessSectionProps> = ({ onChange, section }) => {
  const handleChange = (
    value: string | ProcessStep[],
    key: keyof ProcessContent,
  ) => {
    onChange({ ...section, [key]: value });
  };
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
      <h3 className="mb-5 text-lg font-semibold text-(--text-h)">"Process"</h3>
      <Field
        onChange={(value) => handleChange(value, "eyebrow")}
        label="Eyebrow"
        value={section.eyebrow}
      />
      <Field
        onChange={(value) => handleChange(value, "title")}
        label="Title"
        value={section.title}
      />
      <TextArea label="Description" value={section.description} />
      <TextCards
        title="Steps"
        onChange={(value) => handleChange(value, "steps")}
        items={section.steps}
      />
    </div>
  );
};

export default ProcessSection;
