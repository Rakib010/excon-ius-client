import type { FoundationEntity } from "@/redux/features/foundations/foundations.api";

export type Department = { id: number; name: string; code: string };
export type Batch = { id: number; dept_id: number; name: string; dept_name?: string };
export type Section = { id: number; batch_id: number; name: string; batch_name?: string; dept_name?: string };
export type Course = { id: number; dept_id: number; name: string; code: string; dept_name?: string };

export function asNum(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function safeStr(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

export function mapDepartments(rows: FoundationEntity[]): Department[] {
  return rows.map((d) => ({ id: asNum(d.id), name: safeStr(d.name), code: safeStr(d.code) }));
}

export function mapBatches(rows: FoundationEntity[]): Batch[] {
  return rows.map((b) => ({ id: asNum(b.id), dept_id: asNum(b.dept_id), name: safeStr(b.name), dept_name: safeStr(b.dept_name) }));
}

export function mapSections(rows: FoundationEntity[]): Section[] {
  return rows.map((s) => ({
    id: asNum(s.id),
    batch_id: asNum(s.batch_id),
    name: safeStr(s.name),
    batch_name: safeStr(s.batch_name),
    dept_name: safeStr(s.dept_name),
  }));
}

export function mapCourses(rows: FoundationEntity[]): Course[] {
  return rows.map((c) => ({
    id: asNum(c.id),
    dept_id: asNum(c.dept_id),
    name: safeStr(c.name),
    code: safeStr(c.code),
    dept_name: safeStr(c.dept_name),
  }));
}

