import { apiSlice } from "api/apiSlice";

export const leadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query({
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
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Lead", "Auth", "Team"],
    }),
    createLead: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/leads/create_lead/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    editLead: builder.mutation({
      query: ({ lead, team, data }) => ({
        url: `/api/leads/update_lead/${lead}/${team}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),
    searchLead: builder.query({
      query: ({ team, name, page }) => ({
        url: `/api/leads/search_lead/${team}/?search=${name}&page=${page}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      async onQueryStarted({ team, name }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              leadsApiSlice.util.updateQueryData("getLeads", team, (draft) => {
                if (Number(data.page) !== 1) {
                  draft.results.push(...data.results);
                  draft.has_next = data.has_next;
                } else return data;
              })
            );
          }
        } catch {}
      },
    }),
    deleteLead: builder.mutation({
      query: ({ lead, team }) => ({
        url: `api/leads/delete_lead/${lead}/${team}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Lead", "Client"],
    }),
    convertLeadToClient: builder.mutation({
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
