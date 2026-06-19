import type { FC } from "react";

type ActionButton = {
  children: React.ReactNode;
};

const ActionButton: FC<ActionButton> = ({ children }) => {
  return (
    <button className="rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-left transition hover:border-(--accent-border)">
      {children}
    </button>
  );
};

export default ActionButton;
