import {
  ILoginForm,
  IRegisterForm,
  ILeadAndClientForm,
  ITeamForm,
  IMembersForm,
} from "types";

export const LoginForm: ILoginForm[] = [
  { type: "email", name: "username", required: true },
  { type: "password", name: "password", required: true },
];

export const RegisterForm: IRegisterForm[] = [
  { type: "text", name: "first_name", required: true },
  { type: "text", name: "last_name", required: true },
  { type: "email", name: "username", required: true },
  { type: "password", name: "password", required: true },
  { type: "password", name: "re_password", required: true },
];

export const modalLeadAndClientField: ILeadAndClientForm[] = [
  {
    type: "text",
    name: "first_name",
    required: true,
  },
  { type: "text", name: "last_name", required: true },
  { type: "email", name: "email", required: true },
  { type: "number", name: "phone", required: true },
  {
    type: "textarea",
    name: "description",
    required: true,
  },
];

export const modalTeamField: ITeamForm[] = [
  {
    type: "text",
    name: "name",
    required: true,
  },
  {
    type: "textarea",
    name: "description",
    required: true,
  },
];

export const modalTeamAddMemberField: IMembersForm[] = [
  { type: "email", name: "username", required: true },
];

export const defaultValuesTeam = {
  name: "",
  description: "",
};

export const defaultValueMember = {
  username: "",
};

export const defaultValuesLeadAndClient = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  description: "",
  assigned_to: "",
};

export const LeadDetailsButton = [
  { name: "Client", func: "handleConvert" },
  { name: "Edit", func: "handleEdit" },
  { name: "Delete", red: true, func: "handleDelete" },
];

export const TeamDetailsButton = [
  { name: "Add member", func: "handleAddMember" },
  { name: "Edit", func: "handleEdit" },
  { name: "Delete", red: true, func: "handleDelete" },
];

export const ClientDetailsButton = [
  { name: "Edit", func: "handleEdit" },
  { name: "Delete", red: true, func: "handleDelete" },
];
