export type Id = string;

export type Department = { id: Id; name: string; code: string };
// Server schema uses `number` (INTEGER) for batches; UI may display it as a string.
export type Batch = { id: Id; dept_id: Id; number?: number; name?: string; dept_name?: string };
export type Section = { id: Id; batch_id: Id; name: string; batch_name?: string; dept_name?: string };
export type Course = { id: Id; dept_id: Id; name: string; code: string; dept_name?: string };

