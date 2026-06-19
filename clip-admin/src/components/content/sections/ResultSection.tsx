import type { FC } from "react";
import type { ResultsContent } from "../../../../../shared/types/RootContent";
import Field from "../formFields/Field";
import TextArea from "../formFields/TextArea";
import StringList from "../formFields/StringList";

type ResultSectionProps = {
  section: ResultsContent;
  onChange: (value: ResultsContent) => void;
};

const ResultSection: FC<ResultSectionProps> = ({ onChange, section }) => {
  const handleChange = (
    value: string | string[],
    key: keyof ResultsContent,
  ) => {
    onChange({ ...section, [key]: value });
  };
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
      <h3 className="mb-5 text-lg font-semibold text-(--text-h)">"Results"</h3>
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
      <StringList
        title="Before"
        onChange={(value) => handleChange(value, "before")}
        items={section.before}
      />
      <StringList
        title="After"
        onChange={(value) => handleChange(value, "after")}
        items={section.after}
      />
    </div>
  );
};

export default ResultSection;
