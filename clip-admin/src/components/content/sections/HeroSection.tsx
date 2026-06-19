import type { FC } from "react";
import type {
  CtaLink,
  HeroContent,
} from "../../../../../shared/types/RootContent";
import Field from "../formFields/Field";
import StringList from "../formFields/StringList";
import TextArea from "../formFields/TextArea";
import CtaFormField from "../formFields/CtaFormField";

type HeroSectionProps = {
  section: HeroContent;
  onChange: (value: HeroContent) => void;
};

const HeroSection: FC<HeroSectionProps> = ({ onChange, section }) => {
  const handleChange = (
    value: string | string[] | CtaLink,
    key: keyof HeroContent,
  ) => {
    onChange({ ...section, [key]: value });
  };
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
      <h3 className="mb-5 text-lg font-semibold text-(--text-h)">Hero</h3>
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
      <TextArea label="Subtitle" value={section.subtitle} />
      <CtaFormField
        label="PrimaryCta"
        onChange={(value) => handleChange(value, "primaryCta")}
        value={section.primaryCta}
      />
      <CtaFormField
        label="SecondaryCta"
        onChange={(value) => handleChange(value, "secondaryCta")}
        value={section.secondaryCta}
      />
      <StringList
        title="Common Issues"
        items={section.commonIssues}
        onChange={(value) => handleChange(value, "commonIssues")}
      />
    </div>
  );
};

export default HeroSection;
