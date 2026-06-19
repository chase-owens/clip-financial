import { useEffect, useState, type FC } from "react";
import type { RootContent } from "../../../shared/types/RootContent";
import TextCardSection from "../components/content/sections/TextCardSection";
import HeroSection from "../components/content/sections/HeroSection";
import ProcessSection from "../components/content/sections/ProcessSection";
import ResultSection from "../components/content/sections/ResultSection";
import ContactSection from "../components/content/sections/ContactSection";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Content: FC = () => {
  const [content, setContent] = useState<RootContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasEdits, setHasEdits] = useState(false);

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

  const handleSave = async () => {
    if (!content) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Failed to save content");
      }

      const data = await response.json();

      if (data.content) {
        setHasEdits(false);
        setContent(data.content);
      }

      alert("Content saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (value: RootContent) => {
    setHasEdits(true);
    setContent(value);
  };

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
          onClick={handleSave}
          disabled={isSaving || !hasEdits}
          className="rounded-xl bg-(--accent) px-4 py-2 font-medium text-white"
        >
          {isSaving ? "Saving..." : !hasEdits ? "No Changes" : "Save"}
        </button>
      </header>

      <form className="space-y-6">
        <HeroSection
          section={content.hero}
          onChange={(hero) => handleChange({ ...content, hero: hero })}
        />
        <TextCardSection
          onChange={(value) => handleChange({ ...content, whatWeDo: value })}
          title="What We Do"
          section={content.whatWeDo}
        />
        <TextCardSection
          onChange={(value) => handleChange({ ...content, services: value })}
          title="Services"
          section={content.services}
        />
        <ProcessSection
          section={content.process}
          onChange={(value) => handleChange({ ...content, process: value })}
        />
        <TextCardSection
          onChange={(value) => handleChange({ ...content, whyClip: value })}
          title="Why Clip"
          section={content.whyClip}
        />
        <TextCardSection
          onChange={(value) => handleChange({ ...content, bestFit: value })}
          title="Best Fit"
          section={content.bestFit}
        />

        <ResultSection
          onChange={(value) => handleChange({ ...content, results: value })}
          section={content.results}
        />

        <ContactSection
          onChange={(value) => handleChange({ ...content, contact: value })}
          section={content.contact}
        />
      </form>
    </section>
  );
};

export default Content;
