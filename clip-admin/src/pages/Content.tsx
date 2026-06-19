import { useEffect, useState, type FC } from "react";
import type { RootContent } from "../../../shared/types/RootContent";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Content: FC = () => {
  const [content, setContent] = useState<RootContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getContent() {
      try {
        const response = await fetch(`${API_BASE_URL}/content`);

        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    getContent();
  }, []);

  if (isLoading) return <p>Loading content...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!content) return <p>No content found.</p>;

  return (
    <section>
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
            Content
          </p>
          <h2 className="mt-2 text-3xl font-bold text-(--text-h)">
            Site Content
          </h2>
        </div>

        <button
          type="button"
          className="rounded-xl bg-(--accent) px-4 py-2 font-medium text-white"
        >
          Save
        </button>
      </header>

      <form className="space-y-6">
        <Section title="Hero">
          <Field label="Eyebrow" value={content.hero.eyebrow} />
          <Field label="Title" value={content.hero.title} />
          <Textarea label="Subtitle" value={content.hero.subtitle} />

          <Field
            label="Primary CTA Label"
            value={content.hero.primaryCta.label}
          />
          <Field
            label="Primary CTA Link"
            value={content.hero.primaryCta.href}
          />
          <Field
            label="Secondary CTA Label"
            value={content.hero.secondaryCta.label}
          />
          <Field
            label="Secondary CTA Link"
            value={content.hero.secondaryCta.href}
          />

          <StringList title="Common Issues" items={content.hero.commonIssues} />
        </Section>

        <TextCardSection title="What We Do" section={content.whatWeDo} />
        <TextCardSection title="Services" section={content.services} />

        <Section title="Process">
          <Field label="Eyebrow" value={content.process.eyebrow} />
          <Field label="Title" value={content.process.title} />
          <Textarea label="Description" value={content.process.description} />
          <TextCards title="Steps" items={content.process.steps} />
        </Section>

        <TextCardSection title="Why Clip" section={content.whyClip} />
        <TextCardSection title="Best Fit" section={content.bestFit} />

        <Section title="Results">
          <Field label="Eyebrow" value={content.results.eyebrow} />
          <Field label="Title" value={content.results.title} />
          <Textarea label="Description" value={content.results.description} />
          <StringList title="Before" items={content.results.before} />
          <StringList title="After" items={content.results.after} />
        </Section>

        <Section title="Contact">
          <Field label="Eyebrow" value={content.contact.eyebrow} />
          <Field label="Title" value={content.contact.title} />
          <Textarea label="Description" value={content.contact.description} />
          <Field label="Primary CTA" value={content.contact.primaryCta} />
        </Section>
      </form>
    </section>
  );
};

function TextCardSection({
  title,
  section,
}: {
  title: string;
  section: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
}) {
  return (
    <Section title={title}>
      <Field label="Eyebrow" value={section.eyebrow} />
      <Field label="Title" value={section.title} />
      <Textarea label="Description" value={section.description} />
      <TextCards title="Items" items={section.items} />
    </Section>
  );
}

function TextCards({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-3">
      <h4 className="font-semibold text-(--text-h)">{title}</h4>

      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="grid gap-3 rounded-xl border border-(--border) bg-(--bg) p-4"
        >
          <Field label={`Title ${index + 1}`} value={item.title} />
          <Textarea
            label={`Description ${index + 1}`}
            value={item.description}
          />
        </div>
      ))}
    </div>
  );
}

function StringList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="grid gap-3">
      <h4 className="font-semibold text-(--text-h)">{title}</h4>

      {items.map((item, index) => (
        <Field
          key={`${title}-${index}`}
          label={`${title} ${index + 1}`}
          value={item}
        />
      ))}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
      <h3 className="mb-5 text-lg font-semibold text-(--text-h)">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function Field({ label, value = "" }: { label: string; value?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-(--text-h)">{label}</span>
      <input
        value={value}
        readOnly
        className="rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-(--text-h)"
      />
    </label>
  );
}

function Textarea({ label, value = "" }: { label: string; value?: string }) {
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
}

export default Content;
