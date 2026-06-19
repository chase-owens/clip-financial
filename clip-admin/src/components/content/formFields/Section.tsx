import type { FC, ReactNode } from "react";

type SectionProps = { title: string; children: ReactNode };

const Section: FC<SectionProps> = ({ children, title }) => (
  <div className="rounded-2xl border border-(--border) bg-(--social-bg) p-6 shadow-(--shadow)">
    <h3 className="mb-5 text-lg font-semibold text-(--text-h)">{title}</h3>
    <div className="grid gap-4">{children}</div>
  </div>
);

export default Section;
