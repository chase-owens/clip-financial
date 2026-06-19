import type { FC } from "react";
import Field from "../formFields/Field";
import TextArea from "../formFields/TextArea";
import TextCards from "../formFields/TextCards";
import Section from "../formFields/Section";

type SectionItem = { title: string; description: string };

type Section = {
  eyebrow: string;
  title: string;
  description: string;
  items: SectionItem[];
};

type TextCardSectionProps = {
  onChange: (section: Section) => void;
  section: Section;
  title: string;
};

const TextCardSection: FC<TextCardSectionProps> = ({
  onChange,
  section,
  title,
}) => {
  const handleChange = (value: string | SectionItem[], key: keyof Section) => {
    onChange({ ...section, [key]: value });
  };

  return (
    <Section title={title}>
      <Field
        label="Eyebrow"
        onChange={(value) => handleChange(value, "eyebrow")}
        value={section.eyebrow}
      />
      <Field
        label="Title"
        onChange={(value) => handleChange(value, "title")}
        value={section.title}
      />
      <TextArea label="Description" value={section.description} />
      <TextCards
        title="Items"
        onChange={(value) => handleChange(value, "items")}
        items={section.items}
      />
    </Section>
  );
};

export default TextCardSection;
