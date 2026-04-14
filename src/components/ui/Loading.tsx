import type { ReactNode } from "react";

function Spinner({ size = 22 }: { size?: number }) {
  return <span className="ius-spinner" style={{ width: size, height: size }} aria-hidden="true" />;
}

export function LoadingInline({
  label = "Loading…",
  size = 18,
}: {
  label?: string;
  size?: number;
}) {
  return (
    <span className="ius-loading-inline" role="status" aria-live="polite">
      <Spinner size={size} />
      <span>{label}</span>
    </span>
  );
}

export function LoadingCard({
  title = "Loading…",
  subtitle,
}: {
  title?: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="card ius-loading-card" role="status" aria-live="polite">
      <Spinner size={26} />
      <div>
        <div className="ius-loading-card__title">{title}</div>
        {subtitle ? <div className="ius-loading-card__subtitle">{subtitle}</div> : null}
      </div>
    </div>
  );
}

export function LoadingScreen({
  title = "Loading…",
  subtitle,
}: {
  title?: string;
  subtitle?: ReactNode;
}) {
  return (
    <div className="ius-loading-screen" role="status" aria-live="polite" aria-busy="true">
      <div className="ius-loading-screen__panel">
        <Spinner size={28} />
        <div className="ius-loading-screen__title">{title}</div>
        {subtitle ? <div className="ius-loading-screen__subtitle">{subtitle}</div> : null}
      </div>
    </div>
  );
}

