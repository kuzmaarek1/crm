import { auth } from "mocks/handlers/auth";
import { team } from "mocks/handlers/team";
import { lead } from "mocks/handlers/lead";
import { client } from "mocks/handlers/client";

export const handlers = [...auth, ...team, ...lead, ...client];
