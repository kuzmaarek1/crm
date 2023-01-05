import { factory, primaryKey, oneOf, manyOf } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  user: {
    id: primaryKey(Number),
    username: String,
    first_name: String,
    last_name: String,
    password: String,
  },
  team: {
    id: primaryKey(Number),
    name: String,
    description: faker.lorem.words(100),
    created_by: oneOf("user"),
    members: manyOf("user"),
  },
  lead: {
    id: primaryKey(Number),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone: faker.random.numeric(9),
    email: faker.internet.email(),
    description: faker.lorem.words(100),
    created_by: oneOf("user"),
    team: oneOf("team"),
    assigned_to: oneOf("user"),
  },
  client: {
    id: primaryKey(Number),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone: faker.random.numeric(9),
    email: faker.internet.email(),
    description: faker.lorem.words(100),
    created_by: oneOf("user"),
    team: oneOf("team"),
    assigned_to: oneOf("user"),
  },
});
