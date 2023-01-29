import { faker } from "@faker-js/faker";

let persons = [];
for (let i = 0; i < 5; i++) {
  persons.push({
    id: i,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone: faker.random.numeric(9),
    email: faker.internet.email(),
    description: faker.lorem.words(100),
    assigned_to: null,
  });
}
let teams = [];
for (let i = 0; i < 5; i++) {
  teams.push({
    id: i + 1,
    name: `Zespół - ${i}`,
  });
}

export { persons, teams };
