import { useState } from "react";
import "@/styles/foundations.css";
import { DepartmentsPanel } from "@/components/foundations/DepartmentsPanel";
import { BatchesPanel } from "@/components/foundations/BatchesPanel";
import { SectionsPanel } from "@/components/foundations/SectionsPanel";
import { CoursesPanel } from "@/components/foundations/CoursesPanel";

type FoundationsTab = "departments" | "batches" | "sections" | "courses";

const TAB_LABEL: Record<FoundationsTab, string> = {
  departments: "Departments",
  batches: "Batches",
  sections: "Sections",
  courses: "Courses",
};

export function FoundationsManager() {
  const [tab, setTab] = useState<FoundationsTab>("departments");

  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h1 style={{ margin: 0 }}>Foundations</h1>
            <p className="foundations__lead" style={{ marginTop: 6 }}>
              Manage departments, batches, sections, and courses.
            </p>
          </div>
        </div>

        <div className="foundations__tabs" role="tablist" aria-label="Foundation entity">
          {(Object.keys(TAB_LABEL) as FoundationsTab[]).map((t) => (
            <button
              key={t}
              type="button"
              className={t === tab ? "foundations__tab foundations__tab--active" : "foundations__tab"}
              onClick={() => setTab(t)}
              role="tab"
              aria-selected={t === tab}
            >
              {TAB_LABEL[t]}
            </button>
          ))}
        </div>

        {tab === "departments" ? (
          <DepartmentsPanel />
        ) : tab === "batches" ? (
          <BatchesPanel />
        ) : tab === "sections" ? (
          <SectionsPanel />
        ) : (
          <CoursesPanel />
        )}
      </div>
    </div>
  );
}
