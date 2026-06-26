import type { FC } from "react";
import type { Inquiry } from "../../../shared/types/Inquiry";
import formatDate from "../utils/formatDate";
import { Link } from "react-router-dom";

const RecentInquiry: FC<Inquiry> = ({
  company,
  createdAt,
  inquiryId,
  name,
  status,
}) => (
  <Link to={`inquiries/${inquiryId}`}>
    <div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--bg) px-4 py-3">
      <div>
        <p className="font-medium text-(--text-h)">{name}</p>

        <p className="text-sm text-(--text)">{company}</p>
      </div>

      <div className="text-right">
        <div className="inline-flex rounded-full bg-[(--accent-bg) px-3 py-1 text-xs font-semibold text-(--accent)">
          {status}
        </div>

        <p className="mt-1 text-xs text-(--text)">{formatDate(createdAt)}</p>
      </div>
    </div>
  </Link>
);

export default RecentInquiry;
