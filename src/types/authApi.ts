export type LoginPayload = { email: string; password: string };

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: string;
  employee_id?: string;
  designation?: string;
};

export type LoginResponse = {
  accessToken: string;
  user: { id: string; name: string; email: string; role: string };
};

