export const modalLeadandClientField = [
  {
    type: "text",
    name: "first_name",
    watchName: "first_name",
    required: true,
  },
  { type: "text", name: "last_name", watchName: "last_name", required: true },
  { type: "email", name: "email", watchName: "email", required: true },
  { type: "number", name: "phone", watchName: "phone", required: true },
  {
    type: "text",
    name: "description",
    watchName: "description",
    required: true,
    textarea: true,
  },
];

export const modalTeamField = [
  {
    type: "text",
    name: "name",
    watchName: "name",
    required: true,
  },
  {
    type: "text",
    name: "description",
    watchName: "description",
    required: true,
    textarea: true,
  },
];
