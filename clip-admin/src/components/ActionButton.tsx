import type { FC } from "react";
import { NavLink } from "react-router-dom";

type ActionButtonProps = {
  label: string;
  to: string;
  isExternal?: boolean;
};

const ActionButton: FC<ActionButtonProps> = ({
  label,
  to,
  isExternal = false,
}) => {
  const classes =
    "block rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-left transition hover:border-(--accent-border)";

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    );
  }

  return (
    <NavLink to={to} className={classes}>
      {label}
    </NavLink>
  );
};

export default ActionButton;
