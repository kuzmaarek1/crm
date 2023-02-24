import type { LoginValues, User, Team } from "types";
import type {
  createMessage,
  editMessage,
  deleteMessage,
  convertMessage,
} from "types/reducers";

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

export type IdRequest = { id: string };

export type UpdateAndDeleteClientRequest = {
  id_client: string;
  id_team: string;
};

export type UpdateConverAndDeleteLeadRequest = {
  id_lead: string;
  id_team: string;
};

export type TeamCreateValue = TeamValues & {
  created_by: UserWithoutSanitize;
  members: UserWithoutSanitize;
};

export type LeadAndClient = {
  id: number;
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
  description: string;
  created_by: User;
  assigned_to: User | null;
};

export type LeadAndClientData = {
  results: LeadAndClient[];
  has_next: boolean;
  page: number;
};

export type DataPaginate = {
  results: LeadAndClient[] | Team[];
  has_next: boolean;
  page: number;
};

export type UnauthorizedError = {
  error: "Unauthorized";
};

export type ErrorMessage = {
  error: "Error";
};

export type LogoutMessage = { message: "Logout" };

export type ResponseMessage =
  | createMessage
  | editMessage
  | deleteMessage
  | convertMessage
  | LogoutMessage;

export type LogoutResponse = LogoutMessage | Error;

export type LoginResponse =
  | { auth_token: string }
  | { error: "Invalid user data" };

export type RegisterResponse = createMessage | { error: string };

export type Error = UnauthorizedError | ErrorMessage;

export type UserResponse = User | Error;

export type LeadAndClientDataResponse = DataPaginate | Error;

export type CreateResponse = createMessage | Error;

export type EditResponse = editMessage | Error;

export type DeleteResponse = deleteMessage | Error;

export type ConvertResponse = convertMessage | Error;

export type TeamResponse = Team | Error;

export type TeamDataResponse = DataPaginate | Error;

export type Response<T> = T extends "Edit"
  ? editMessage
  : T extends "Delete"
  ? deleteMessage
  : T extends "Data"
  ? DataPaginate
  : T extends "Create"
  ? createMessage
  : T extends "Convert"
  ? convertMessage
  : T extends "User"
  ? User
  : T extends "Team"
  ? Team
  : LogoutMessage;
