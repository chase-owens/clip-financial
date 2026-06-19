import { Link } from "react-router-dom";
import useInquiries from "../hooks/useInquiries";
import formatDate from "../utils/formatDate";

export default function Inquiries() {
  const { error, inquiries, isLoading } = useInquiries();

  return (
    <section>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
          Inquiries
        </p>
        <h2 className="mt-2 text-3xl font-bold text-(--text-h)">
          Website Inquiries
        </h2>
      </header>

      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--social-bg) shadow-(--shadow)">
        {isLoading && <p className="p-6 text-sm">Loading inquiries...</p>}
        {error && <p className="p-6 text-sm text-red-500">{error}</p>}

        {!isLoading && !error && inquiries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-(--border) text-xs uppercase tracking-[0.16em]">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Software</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.inquiryId}
                    className="border-b border-(--border) last:border-b-0"
                  >
                    <td className="px-5 py-4 font-medium text-(--text-h)">
                      {inquiry.name}
                    </td>
                    <td className="px-5 py-4">{inquiry.company || "—"}</td>
                    <td className="px-5 py-4">{inquiry.software || "—"}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-(--accent-border) bg-(--accent-bg) px-3 py-1 text-xs font-semibold text-(--accent)">
                        {inquiry.status ?? "new"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {formatDate(inquiry.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/inquiries/${inquiry.inquiryId}`}
                        className="rounded-xl bg-(--accent) px-3 py-2 text-xs font-semibold text-white"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
