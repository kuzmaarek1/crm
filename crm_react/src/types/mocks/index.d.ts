import type { LoginValues, User, Team, Page } from "types";
import type {
  CreateMessage,
  EditMessage,
  DeleteMessage,
  ConvertMessage,
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

export type DataPaginate<T> = {
  results: T extends "Team" ? Team[] : LeadAndClient[];
} & Page;

export type UnauthorizedError = {
  error: "Unauthorized";
};

export type ErrorMessage = {
  error: "Error";
};

export type LogoutMessage = { message: "Logout" };

export type ResponseMessage =
  | CreateMessage
  | EditMessage
  | DeleteMessage
  | ConvertMessage
  | LogoutMessage;

export type LogoutResponse = LogoutMessage | Error;

export type LoginResponse =
  | { auth_token: string }
  | { error: "Invalid user data" };

export type RegisterResponse = CreateMessage | { error: string };

export type Error = UnauthorizedError | ErrorMessage;

export type UserResponse = User | Error;

export type LeadAndClientDataResponse = DataPaginate<"LeadAndClient"> | Error;

export type TeamDataResponse = DataPaginate<"Team"> | Error;

export type CreateResponse = CreateMessage | Error;

export type EditResponse = EditMessage | Error;

export type DeleteResponse = DeleteMessage | Error;

export type ConvertResponse = ConvertMessage | Error;

export type TeamResponse = Team | Error;

export type Response<T> = T extends "Edit"
  ? EditMessage
  : T extends "Delete"
  ? DeleteMessage
  : T extends "LeadAndClientData"
  ? DataPaginate<"LeadAndClient">
  : T extends "TeamData"
  ? DataPaginate<"Team">
  : T extends "Create"
  ? CreateMessage
  : T extends "Convert"
  ? ConvertMessage
  : T extends "User"
  ? User
  : T extends "Team"
  ? Team
  : LogoutMessage;
