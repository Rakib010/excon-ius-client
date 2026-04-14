export type TabItem<T extends string> = { id: T; label: string };

export function Tabs<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (next: T) => void;
  items: TabItem<T>[];
}) {
  return (
    <div className="foundations__tabs">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`foundations__tab ${value === it.id ? "foundations__tab--active" : ""}`}
          onClick={() => onChange(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

