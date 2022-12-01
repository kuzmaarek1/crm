import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("store")).auth.authData
    ?.auth_token;
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
});

export const signIn = (data) => API.post("/api/token/login", data);
export const signUp = (data) => API.post("/api/users/", data);
export const logOut = () => API.post("/api/token/logout/");
export const getUser = () => API.get("/api/users/me/");

export const getTeam = () => API.get("/api/teams/get_team/");
export const addMember = (id, data) =>
  API.patch(`/api/teams/add_member/${id}/`, data);
export const addTeam = (data) => API.post(`/api/teams/`, data);
export const getTeams = () => API.get(`/api/teams/`);
export const deleteTeam = (id) => API.put(`/api/teams/delete_team/${id}/`);
export const searchTeam = (name) => API.get(`api/teams/search_team/${name}/`);

export const getClients = (id) => API.get(`/api/clients/get_client/${id}/`);
export const createClient = (id, data) =>
  API.post(`/api/clients/create_client/${id}/`, data);
export const editClient = (client, team, data) =>
  API.put(`/api/clients/update_client/${client}/${team}/`, data);
export const searchClient = (id, name) =>
  API.get(`/api/clients/search_client/${id}/${name}/`);
export const deleteClient = (client, team) =>
  API.put(`/api/clients/delete_client/${client}/${team}/`);

export const getLeads = (id) => API.get(`/api/leads/get_lead/${id}/`);
export const createLead = (id, data) =>
  API.post(`/api/leads/create_lead/${id}/`, data);
export const editLead = (lead, team, data) =>
  API.put(`/api/leads/update_lead/${lead}/${team}/`, data);
export const searchLead = (team, name) =>
  API.get(`/api/leads/search_lead/${team}/${name}/`);
export const deleteLead = (lead, team) =>
  API.put(`api/leads/delete_lead/${lead}/${team}/`);
export const convetLeadToClient = (lead, team) =>
  API.post(`/api/convert_lead_to_client/${lead}/${team}/`);
