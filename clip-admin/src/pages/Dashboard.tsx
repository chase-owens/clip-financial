import ActionButton from "../components/ActionButton";
import DashboardCard from "../components/DashboardCard";
import "../index.css";

const Dashboard = () => {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="New Inquiries" value="0" />
        <DashboardCard label="Content Sections" value="4" />
        <DashboardCard label="Published Site" value="Live" />
        <DashboardCard label="Admin Status" value="Protected" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border---border) bg-(--social-bg) p-5 shadow---shadow)">
          <h3 className="font-semibold text-(--text-h)">Recent Inquiries</h3>

          <p className="mt-3 text-sm text---text)">No inquiries yet.</p>
        </div>

        <div className="rounded-2xl border border---border) bg-(--social-bg) p-5 shadow---shadow)">
          <h3 className="font-semibold text-(--text-h)">Quick Actions</h3>

          <div className="mt-4 grid gap-3">
            <ActionButton>Edit Content</ActionButton>
            <ActionButton>View Inquiries</ActionButton>
            <ActionButton>Open Website</ActionButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
