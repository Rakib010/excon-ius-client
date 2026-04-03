export function Logs() {
  return (
    <div className="card">
      <h1>Logs</h1>
      <p>Audit trail for activity, allocations and approvals.</p>
      <ul>
        <li>GET `/logs/activity`</li>
        <li>GET `/logs/allocation-history`</li>
        <li>GET `/logs/leave-approvals`</li>
        <li>GET `/logs/admin-actions`</li>
      </ul>
    </div>
  );
}

