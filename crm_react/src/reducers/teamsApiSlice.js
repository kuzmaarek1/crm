import { apiSlice } from "api/apiSlice";

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => ({
        url: "/api/teams/get_team/",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    getTeams: builder.query({
      query: () => ({
        url: "/api/teams/",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    searchTeam: builder.query({
      query: (name) => ({
        url: `api/teams/search_team/${name}/`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    addMember: builder.mutation({
      query: ({ id, username }) => ({
        url: `/api/teams/add_member/${id}/`,
        method: "PATCH",
        body: { username },
      }),
      invalidatesTags: ["Team"],
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: `/api/teams/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/api/teams/delete_team/${id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamQuery,
  useGetTeamsQuery,
  useSearchTeamQuery,
  useAddMemberMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
} = teamsApiSlice;
