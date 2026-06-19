import { useEffect, useState } from "react";
import type { Inquiry } from "../../../shared/types/Inquiry";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const response = await fetch(`${API_BASE_URL}/inquiries`);

        if (!response.ok) {
          throw new Error("Failed to fetch inquiries");
        }

        const data = await response.json();

        setInquiries(data.inquiries ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchInquiries();
  }, []);

  return (
    <section>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
          Inquiries
        </p>

        <h2 className="mt-2 text-3xl font-bold text-(--text-h)">
          Website Inquiries
        </h2>

        <p className="mt-2 text-sm text-(--text)">
          Review new messages submitted from the Clip Financial website.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--social-bg) shadow-(--shadow)">
        {isLoading && (
          <p className="p-6 text-sm text-(--text)">Loading inquiries...</p>
        )}

        {error && <p className="p-6 text-sm text-red-500">{error}</p>}

        {!isLoading && !error && inquiries.length === 0 && (
          <p className="p-6 text-sm text-(--text)">No inquiries yet.</p>
        )}

        {!isLoading && !error && inquiries.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-(--border) text-xs uppercase tracking-[0.16em] text-(--text)">
                <tr>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Message</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
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

                    <td className="px-5 py-4">
                      <div>{inquiry.email || "No email"}</div>
                    </td>

                    <td className="max-w-md px-5 py-4 text-(--text)">
                      {inquiry.message || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full border border-(--accent-border) bg-(--accent-bg) px-3 py-1 text-xs font-semibold text-(--accent)">
                        {inquiry.status ?? "new"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-(--text)">
                      {formatDate(inquiry.createdAt)}
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

function formatDate(value?: string) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
