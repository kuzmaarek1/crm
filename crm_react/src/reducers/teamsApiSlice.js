import { apiSlice } from "api/apiSlice";
import {
  deleteTeamSuccess,
  editTeamSuccess,
  addMemberSuccess,
} from "reducers/teams.js";

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
    editTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/teams/update_team/${id}/`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(editTeamSuccess({ data: { id, data } }));
        } catch {}
      },
      invalidatesTags: ["Team"],
    }),
    searchTeam: builder.query({
      query: ({ name }) => ({
        url: `api/teams/search_team/${name}/`,
        method: "GET",
      }),
      async onQueryStarted({ name }, { dispatch, queryFulfilled }) {
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
      async onQueryStarted({ id, username }, { dispatch, queryFulfilled }) {
        try {
          const user = await queryFulfilled;
          dispatch(addMemberSuccess({ data: { id, user: user.data } }));
        } catch {}
      },
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
      async onQueryStarted(
        { id, teams },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          await queryFulfilled;
          console.log(String(getState().teams.currentTeam.id) === String(id));
          if (String(getState().teams.currentTeam.id) === String(id)) {
            dispatch(
              teamsApiSlice.util.prefetch("getTeams", undefined, {
                force: true,
              })
            );
            dispatch(
              teamsApiSlice.util.prefetch("getTeam", undefined, {
                force: true,
              })
            );
          }
        } catch (er) {
          console.log(er);
        }
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
  useEditTeamMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
} = teamsApiSlice;
