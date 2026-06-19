import { useEffect, useState, type FC } from "react";

type SiteContent = {
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  services?: {
    title?: string;
    description?: string;
  };
  about?: {
    title?: string;
    description?: string;
  };
  contact?: {
    title?: string;
    description?: string;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Content: FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getContent() {
      try {
        const response = await fetch(`${API_BASE_URL}/content`);

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

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

  if (isLoading) {
    return <p>Loading content...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!content) {
    return <p>No content found.</p>;
  }

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
          <Field label="Eyebrow" value={content.hero?.eyebrow} />
          <Field label="Title" value={content.hero?.title} />
          <Textarea label="Subtitle" value={content.hero?.subtitle} />
          <Field label="Primary CTA" value={content.hero?.primaryCta} />
          <Field label="Secondary CTA" value={content.hero?.secondaryCta} />
        </Section>

        <Section title="Services">
          <Field label="Title" value={content.services?.title} />
          <Textarea label="Description" value={content.services?.description} />
        </Section>

        <Section title="About">
          <Field label="Title" value={content.about?.title} />
          <Textarea label="Description" value={content.about?.description} />
        </Section>

        <Section title="Contact">
          <Field label="Title" value={content.contact?.title} />
          <Textarea label="Description" value={content.contact?.description} />
        </Section>
      </form>
    </section>
  );
};

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
