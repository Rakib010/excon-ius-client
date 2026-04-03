/**
 * Shapes aligned with excon-ius-server responses for TEACHER role.
 * GET /auth/profile → full user row minus password/refresh_token
 */

export type TeacherProfile = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  employee_id?: string | null;
  designation?: string | null;
  is_active?: boolean;
  /** Invigilation scheduling — server `users.is_available` */
  is_available?: boolean | null;
  phone?: string | null;
  dob?: string | null;
  marital_status?: string | null;
  gender?: string | null;
  emergency_contact?: string | null;
  present_address?: string | null;
  permanent_address?: string | null;
  created_at?: string;
  updated_at?: string;
};

/** GET /leaves/history — teacher sees own rows via LeaveModel.findByTeacherId */
export type TeacherLeaveRow = {
  id: string;
  teacher_id: string;
  start_date: string;
  end_date: string;
  reason?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  created_at?: string;
  teacher_name?: string;
};

/** GET /allocations/published — filter client-side where `teacher_id` === current user */
export type PublishedAllocationRow = {
  id: string;
  exam_id: string;
  teacher_id: string;
  room_id: string;
  status: string;
  course_name: string;
  exam_date: string;
  room_name: string;
  teacher_name: string;
};
