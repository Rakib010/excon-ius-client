export type ExamRoomEntity = Record<string, unknown> & { id?: number | string };

export type Room = {
  id: number;
  name: string;
  building: string;
  capacity: number;
  is_defect: boolean;
};

export type Exam = {
  id: number;
  course_id: number;
  course_name: string;
  course_code: string;
  dept_id: number;
  dept: string;
  batch_id: number;
  batch: string;
  section_id: number;
  section: string;
  exam_date: string;
  start_time: string;
  end_time: string;
};

