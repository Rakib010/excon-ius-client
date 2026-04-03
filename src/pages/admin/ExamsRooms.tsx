export function ExamsRooms() {
  return (
    <div className="card">
      <h1>Exams & Rooms</h1>
      <p>Create exams and rooms, assign rooms to exams, and view capacity.</p>
      <ul>
        <li>Exams: `/exam-room/exams`</li>
        <li>Rooms: `/exam-room/rooms`</li>
        <li>Assign room: POST `/exam-room/rooms/assign`</li>
      </ul>
    </div>
  );
}

