import type { LoginValues } from "types";

export interface RegisterValues extends LoginValues {
  first_name: string;
  last_name: string;
}

export type LeadAndClientValuesWithNull = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description: string;
  assigned_to: UserWithoutSanitize | { id: undefined } | null;
};

export type UserWithoutSanitize = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type TeamWithoutSanitize = {
  id: number;
  name: string;
  description: string;
  created_by: UserWithoutSanitize;
  members: UserWithoutSanitize[];
};

export type LeadAndClientWithoutSanitize = {
  id: number;
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
  description: string;
  created_by: UserWithoutSanitize;
  assigned_to: UserWithoutSanitize | null;
  team: TeamWithoutSanitize;
};

export type LoginResponse = { auth_token: string } | { error: string };
export type RegisterResponse = { message: "Create" } | { error: string };
export type LogoutResponse = { message: "Logout" };
