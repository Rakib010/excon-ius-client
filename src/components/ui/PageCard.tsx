import type { ReactNode } from "react";

export function PageCard({
  title,
  lead,
  actions,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="foundations">
      <div className="card foundations__card">
        <div className="foundations__page-head">
          <div>
            <h1 style={{ margin: 0 }}>{title}</h1>
            {lead ? <p className="foundations__lead">{lead}</p> : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

