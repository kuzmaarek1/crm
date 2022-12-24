export const modalLeadandClientField = [
  {
    type: "text",
    name: "first_name",
    required: true,
  },
  { type: "text", name: "last_name", required: true },
  { type: "email", name: "email", required: true },
  { type: "number", name: "phone", required: true },
  {
    type: "text",
    name: "description",
    required: true,
    textarea: true,
  },
];

export const modalTeamField = [
  {
    type: "text",
    name: "name",
    required: true,
  },
  {
    type: "text",
    name: "description",
    required: true,
    textarea: true,
  },
];

export const LoginForm = [
  { type: "email", name: "username", required: true },
  { type: "password", name: "password", required: true },
];

export const RegisterForm = [
  { type: "text", name: "first_name", required: true },
  { type: "text", name: "last_name", required: true },
  { type: "email", name: "username", required: true },
  { type: "password", name: "password", required: true },
  { type: "password", name: "re_password", required: true, validate: true },
];

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
