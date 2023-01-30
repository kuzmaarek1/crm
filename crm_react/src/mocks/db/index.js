import { factory, primaryKey, oneOf, manyOf, nullable } from "@mswjs/data";
import { faker } from "@faker-js/faker";

faker.seed(123);
export const db = factory({
  user: {
    id: primaryKey(faker.datatype.number),
    username: String,
    first_name: String,
    last_name: String,
    password: String,
  },
  team: {
    id: primaryKey(faker.datatype.number),
    name: String,
    description: String,
    created_by: oneOf("user"),
    members: manyOf("user"),
  },
  lead: {
    id: primaryKey(faker.datatype.number),
    first_name: String,
    last_name: String,
    phone: Number,
    email: String,
    description: String,
    created_by: oneOf("user"),
    team: oneOf("team"),
    assigned_to: nullable(oneOf("user")),
  },
  client: {
    id: primaryKey(faker.datatype.number),
    first_name: String,
    last_name: String,
    phone: Number,
    email: String,
    description: String,
    created_by: oneOf("user"),
    team: oneOf("team"),
    assigned_to: nullable(oneOf("user")),
  },
});
