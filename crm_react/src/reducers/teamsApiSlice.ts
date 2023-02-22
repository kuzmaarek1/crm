import { apiSlice } from "api/apiSlice";
import { editTeamSuccess, addMemberSuccess } from "reducers/teams";
import type { RootState } from "store";
import type { TeamData, TeamValues, Team, User } from "types";
import type {
  Page,
  editTeamProps,
  searchTeamProps,
  deleteTeamProps,
  addMemberProps,
  editMessage,
  deleteMessage,
} from "types/reducers";

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query<Team, void>({
      query: () => ({
        url: "/api/teams/get_team/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    getTeams: builder.query<TeamData, Page>({
      query: ({ page }) => ({
        url: `/api/teams/get_teams/?page=${page}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (Number(newItems.page) !== 1)
          currentCache.results.push(...newItems.results);
        else currentCache.results = newItems.results;
        currentCache.has_next = newItems.has_next;
      },
      providesTags: ["Team", "Auth"],
    }),
    editTeam: builder.mutation<editMessage, editTeamProps>({
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
    searchTeam: builder.query<TeamData, searchTeamProps>({
      query: ({ name, page }) => ({
        url: `api/teams/search_team/?search=${name}&page=${page}`,
        method: "GET",
      }),
      async onQueryStarted({ name, page }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              teamsApiSlice.util.updateQueryData(
                "getTeams",
                { page: page },
                (draft) => {
                  if (Number(data.page) !== 1) {
                    draft.results.push(...data.results);
                    draft.has_next = data.has_next;
                  } else return data;
                }
              )
            );
          }
        } catch {}
      },
    }),
    addMember: builder.mutation<User, addMemberProps>({
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
    addTeam: builder.mutation<Team, TeamValues>({
      query: (data) => ({
        url: `/api/teams/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation<deleteMessage, deleteTeamProps>({
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
          if (
            String((getState() as RootState).teams.currentTeam.id) ===
            String(id)
          ) {
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
