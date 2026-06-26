import ActionButton from "../components/ActionButton";
import DashboardCard from "../components/DashboardCard";
import RecentInquiry from "../components/RecentInquiry";
import useInquiries from "../hooks/useInquiries";
import "../index.css";

const actions = [
  { label: "Edit Content", to: "/content" },
  { label: "View Inquiries", to: "/inquiries" },
  {
    label: "Open Website",
    to: "https://d1b22yxfwigc7c.cloudfront.net",
    isExternal: true,
  },
];

const Dashboard = () => {
  const { inquiries, isLoading } = useInquiries({ status: "new" });

  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
            Dashboard
          </p>

          <h2 className="mt-2 text-3xl font-bold text-(--text-h)">
            Business Overview
          </h2>
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="New Inquiries"
          value={`${isLoading ? "Loading..." : inquiries.length}`}
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border---border) bg-(--social-bg) p-5 shadow---shadow)">
          <h3 className="font-semibold text-(--text-h)">Recent Inquiries</h3>
          {inquiries.map((inquiry) => (
            <RecentInquiry key={inquiry.inquiryId} {...inquiry} />
          ))}
        </div>

        <div className="rounded-2xl border border---border) bg-(--social-bg) p-5 shadow---shadow)">
          <h3 className="font-semibold text-(--text-h)">Quick Actions</h3>

          <div className="mt-4 grid gap-3">
            {actions.map((action) => (
              <ActionButton {...action} key={action.to} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
