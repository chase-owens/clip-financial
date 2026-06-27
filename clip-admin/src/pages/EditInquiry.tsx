import { useState, type FC } from "react";
import useInquiries from "../hooks/useInquiries";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../components/inquiries/TextField";
import type { Status } from "../../../shared/types/Inquiry";
import clsx from "clsx";

type SaveState = "clean" | "dirty" | "saved";

const EditInquiry: FC = () => {
  const navigate = useNavigate();
  const { inquiryId } = useParams();
  const { currentInquiry, error, isLoading, updateInquiry } = useInquiries({
    inquiryId,
  });

  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading) {
    return <div className="max-w-4xl">Fetching Inquiries</div>;
  }

  if (!currentInquiry) {
    return (
      <div className="max-w-4xl">no inquiry found :( {error && error}</div>
    );
  }
  const { name, company, email, message, software, createdAt } = currentInquiry;

  const handleSave = async () => {
    if (!inquiryId || !status) {
      return;
    }

    setIsSaving(true);

    try {
      await updateInquiry({ inquiryId, updates: { status, notes } });
      setSaveState("saved");

      setTimeout(() => setSaveState("clean"), 1500);
    } catch {
      alert("Failed to update inquiry");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="max-w-4xl">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent)">
          Inquiry
        </p>

        <h2 className="mt-2 text-3xl font-bold text-(--text-h)">{name}</h2>
      </header>

      <div className="space-y-6">
        <div className="rounded-2xl border border-(--border) bg---social-bg] p-6">
          <h3 className="mb-4 font-semibold text---text-h)">Inquiry Details</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Company" value={company} />
            <TextField label="Email" value={email} />
            <TextField label="Software" value={software} />
            <TextField label="Created" value={createdAt} />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-medium">Message</label>

            <div className="rounded-xl border border-(--border) bg-(--bg) p-4">
              {message}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-(--border) bg---social-bg) p-6">
          <h3 className="mb-4 font-semibold text-(--text-h)">Internal Notes</h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-medium">Status</label>

              <select
                value={status ?? currentInquiry.status}
                onChange={(event) => {
                  setSaveState("dirty");
                  setStatus(event.target.value as Status);
                }}
                className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-10"
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="quoted">Quoted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Notes</label>

              <textarea
                rows={8}
                value={notes}
                onChange={(event) => {
                  setSaveState("dirty");
                  setNotes(event.target.value);
                }}
                className="w-full rounded-xl border border-(--border) bg-(--bg) p-4"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/inquiries")}
                className="rounded-xl border border-(--border) px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={saveState === "clean" || isSaving}
                onClick={handleSave}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditInquiry;
