import type { FC } from "react";
import type { ContactContent } from "../../../../../shared/types/RootContent";
import Field from "../formFields/Field";
import TextArea from "../formFields/TextArea";
type ContactSectionProps = {
  section: ContactContent;
  onChange: (value: ContactContent) => void;
};

const ContactSection: FC<ContactSectionProps> = ({ onChange, section }) => {
  const handleChange = (value: string, key: keyof ContactContent) => {
    onChange({ ...section, [key]: value });
  };
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
      <h3 className="mb-5 text-lg font-semibold text-(--text-h)">"Contact"</h3>
      <Field
        label="Eyebrow"
        value={section.eyebrow}
        onChange={(value) => handleChange(value, "eyebrow")}
      />
      <Field
        label="Title"
        value={section.title}
        onChange={(value) => handleChange(value, "title")}
      />
      <TextArea label="Subtitle" value={section.description} />
      <Field
        label="PrimaryCta"
        value={section.primaryCta}
        onChange={(value) => handleChange(value, "primaryCta")}
      />
    </div>
  );
};

export default ContactSection;
