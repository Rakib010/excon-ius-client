export function LeaveRequests() {
  return (
    <div className="card">
      <h1>Leave Requests</h1>
      <p>Approve or reject teacher leave requests and manage availability.</p>
      <ul>
        <li>GET `/leaves/requests`</li>
        <li>PUT `/leaves/approve/:id`</li>
        <li>PUT `/leaves/reject/:id`</li>
        <li>GET `/leaves/availability`</li>
        <li>POST `/leaves/availability/override`</li>
      </ul>
    </div>
  );
}

