import { apiSlice } from "api/apiSlice";
import { deleteTeamSuccess, addMemberSuccess } from "reducers/teams.js";

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => ({
        url: "/api/teams/get_team/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getTeams: builder.query({
      query: () => ({
        url: "/api/teams/",
        method: "GET",
      }),
      providesTags: ["Team", "Auth"],
    }),
    searchTeam: builder.query({
      query: (name) => ({
        url: `api/teams/search_team/${name}/`,
        method: "GET",
      }),
      async onQueryStarted(name, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              teamsApiSlice.util.updateQueryData(
                "getTeams",
                undefined,
                (draft) => data
              )
            );
          }
        } catch {}
      },
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
      query: ({ id, teams }) => ({
        url: `/api/teams/delete_team/${id}/`,
        method: "PUT",
      }),
      async onQueryStarted({ id, teams }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(deleteTeamSuccess({ data: { id, teams } }));
        } catch {}
      },
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
