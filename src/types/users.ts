/** Public user shape from API (no password). */
export type UserRecord = Record<string, unknown> & {
  id: string;
  name?: string;
  email?: string;
  role?: string;
};

