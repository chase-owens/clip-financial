import type { FC } from "react";
import TextCardSection from "../components/content/sections/TextCardSection";
import HeroSection from "../components/content/sections/HeroSection";
import ProcessSection from "../components/content/sections/ProcessSection";
import ResultSection from "../components/content/sections/ResultSection";
import ContactSection from "../components/content/sections/ContactSection";
import useContent from "../hooks/useContent";
import clsx from "clsx";

const Content: FC = () => {
  const { content, error, isLoading, isSaving, onChange, onSave, saveState } =
    useContent();

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
          disabled={saveState === "clean" || isSaving}
          onClick={() => onSave()}
          className={clsx(
            "rounded-xl px-4 py-2 font-semibold transition-colors cursor-pointer",
            {
              "bg-blue-600 text-white": saveState === "dirty",
              "bg-green-600 text-white": saveState === "saved",
              "bg-slate-300 text-slate-600 cursor-not-allowed":
                saveState === "clean",
            },
          )}
        >
          {saveState === "saved"
            ? "Saved ✓"
            : isSaving
              ? "Saving..."
              : saveState === "dirty"
                ? "Save Changes"
                : "No Changes"}
        </button>
      </header>

      <form className="space-y-6">
        <HeroSection
          section={content.hero}
          onChange={(hero) => onChange({ ...content, hero })}
        />
        <TextCardSection
          onChange={(whatWeDo) => onChange({ ...content, whatWeDo })}
          title="What We Do"
          section={content.whatWeDo}
        />
        <TextCardSection
          onChange={(services) => onChange({ ...content, services })}
          title="Services"
          section={content.services}
        />
        <ProcessSection
          section={content.process}
          onChange={(process) => onChange({ ...content, process })}
        />
        <TextCardSection
          onChange={(whyClip) => onChange({ ...content, whyClip })}
          title="Why Clip"
          section={content.whyClip}
        />
        <TextCardSection
          onChange={(bestFit) => onChange({ ...content, bestFit })}
          title="Best Fit"
          section={content.bestFit}
        />

        <ResultSection
          onChange={(results) => onChange({ ...content, results })}
          section={content.results}
        />

        <ContactSection
          onChange={(contact) => onChange({ ...content, contact })}
          section={content.contact}
        />
      </form>
    </section>
  );
};

export default Content;
