export function Allocations() {
  return (
    <div className="card">
      <h1>Allocations</h1>
      <p>Trigger AI allocation, publish and export reports.</p>
      <ul>
        <li>POST `/allocations/trigger-ai`</li>
        <li>GET `/allocations/ai-allocation`</li>
        <li>POST `/allocations/publish`</li>
        <li>GET `/allocations/reports`</li>
        <li>GET `/allocations/reports/export`</li>
      </ul>
    </div>
  );
}

