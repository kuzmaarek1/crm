import { setupServer } from "msw/node";
import { handlers } from "mocks/handlers";
import { db } from "mocks/db";

const server = setupServer(...handlers);

beforeAll(() => {
  const firstUser = db.user.create({
    id: 1,
    username: "akuzma555@gmail.com",
    first_name: "Dawid",
    last_name: "Kuźma",
    password: "Mrooodyle1eee@",
  });
  const secondUser = db.user.create({
    id: 2,
    username: "akuzma55@gmail.com",
    first_name: "Dawidek",
    last_name: "Kuźma",
    password: "Mrooodyle1eee@",
  });
  const team = db.team.create({
    id: 1,
    name: "Moj zespol",
    created_by: firstUser,
    members: [firstUser, secondUser],
  });
  for (let i = 0; i < 15; i++) {
    db.lead.create({
      id: i + 1,
      created_by: firstUser,
      team: team,
      assigned_to: firstUser,
    });
    db.client.create({
      id: i + 1,
      created_by: firstUser,
      team: team,
      assigned_to: firstUser,
    });
  }
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
