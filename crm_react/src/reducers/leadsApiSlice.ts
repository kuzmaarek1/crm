import { apiSlice } from "api/apiSlice";
import type { LeadAndClientData } from "types";
import type {
  getProps,
  searchLeadAndClientProps,
  createLeadAndClientProps,
  editLeadProps,
  deleteAndCovertLeadProps,
  createMessage,
  editMessage,
  deleteMessage,
  convertMessage,
} from "types/reducers";

export const leadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<LeadAndClientData, getProps>({
      query: ({ id, page }) => ({
        url: `/api/leads/get_lead/${id}/?page=${page}`,
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
      providesTags: ["Lead", "Auth", "Team"],
    }),
    createLead: builder.mutation<createMessage, createLeadAndClientProps>({
      query: ({ id, data }) => ({
        url: `/api/leads/create_lead/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    editLead: builder.mutation<editMessage, editLeadProps>({
      query: ({ lead, team, data }) => ({
        url: `/api/leads/update_lead/${lead}/${team}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    searchLead: builder.query<LeadAndClientData, searchLeadAndClientProps>({
      query: ({ team, name, page }) => ({
        url: `/api/leads/search_lead/${team}/?search=${name}&page=${page}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      async onQueryStarted({ team, name, page }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              leadsApiSlice.util.updateQueryData(
                "getLeads",
                { id: team, page: page },
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
    deleteLead: builder.mutation<deleteMessage, deleteAndCovertLeadProps>({
      query: ({ lead, team }) => ({
        url: `api/leads/delete_lead/${lead}/${team}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Lead", "Client"],
    }),
    convertLeadToClient: builder.mutation<
      convertMessage,
      deleteAndCovertLeadProps
    >({
      query: ({ lead, team }) => ({
        url: `/api/convert_lead_to_client/${lead}/${team}/`,
        method: "POST",
      }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useEditLeadMutation,
  useSearchLeadQuery,
  useConvertLeadToClientMutation,
  useDeleteLeadMutation,
} = leadsApiSlice;
