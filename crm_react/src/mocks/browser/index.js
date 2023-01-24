import { setupWorker } from "msw";
import { handlers } from "mocks/handlers";
import { db } from "mocks/db";
import { faker } from "@faker-js/faker";

faker.seed(123);
export const worker = setupWorker(...handlers);

const database = () => {
  const firstUser = db.user.create({
    username: "akuzma555@gmail.com",
    first_name: "Dawid",
    last_name: "Kuźma",
    password: "Mrooodyle1eee@",
  });
  const secondUser = db.user.create({
    username: "akuzma55@gmail.com",
    first_name: "Dawidek",
    last_name: "Kuźma",
    password: "Mrooodyle1eee@",
  });
  const team = db.team.create({
    name: "Moj zespol",
    created_by: firstUser,
    description: faker.lorem.words(100),
    members: [firstUser, secondUser],
  });
  for (let i = 0; i < 15; i++) {
    db.lead.create({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone: faker.random.numeric(9),
      email: faker.internet.email(),
      description: faker.lorem.words(100),
      created_by: firstUser,
      team: team,
      assigned_to: firstUser,
    });
  }
  for (let i = 0; i < 12; i++) {
    db.client.create({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone: faker.random.numeric(9),
      email: faker.internet.email(),
      description: faker.lorem.words(100),
      created_by: firstUser,
      team: team,
      assigned_to: firstUser,
    });
  }
};

database();
window.mocks = {
  database,
};
