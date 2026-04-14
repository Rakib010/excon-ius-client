import type { FoundationEntity } from "@/redux/features/foundations/foundations.api";
import type { Batch, Course, Department, Section } from "@/types/foundations";

function asId(v: unknown): string {
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  if (v == null) return "";
  return String(v);
}

export function asNum(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function safeStr(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

function toRowArray(input: unknown): FoundationEntity[] {
  if (Array.isArray(input)) return input as FoundationEntity[];
  const data = (input as any)?.data;
  if (Array.isArray(data)) return data as FoundationEntity[];
  return [];
}

export function mapDepartments(rows: unknown): Department[] {
  return toRowArray(rows).map((d) => ({ id: asId(d.id), name: safeStr(d.name), code: safeStr(d.code) }));
}

export function mapBatches(rows: unknown): Batch[] {
  return toRowArray(rows).map((b) => ({
    id: asId(b.id),
    dept_id: asId(b.dept_id),
   number: asNum((b as any).number),
    name: safeStr((b as any).name ?? (b as any).number),
    dept_name: safeStr(b.dept_name),
  }));
}

export function mapSections(rows: unknown): Section[] {
  return toRowArray(rows).map((s) => ({
    id: asId(s.id),
    batch_id: asId(s.batch_id),
    name: safeStr(s.name),
    batch_name: safeStr((s as any).batch_name ?? (s as any).batch_number),
    dept_name: safeStr(s.dept_name),
  }));
}

export function mapCourses(rows: unknown): Course[] {
  return toRowArray(rows).map((c) => ({
    id: asId(c.id),
    dept_id: asId(c.dept_id),
    name: safeStr(c.name),
    code: safeStr(c.code),
    dept_name: safeStr(c.dept_name),
  }));
}

