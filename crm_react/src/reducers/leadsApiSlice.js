import { apiSlice } from "api/apiSlice";

export const leadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query({
      query: (id) => ({
        url: `/api/leads/get_lead/${id}/?page=1`,
        method: "GET",
      }),
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
      query: ({ team, name }) => ({
        url: `/api/leads/search_lead/${team}/?search=${name}&page=1`,
        method: "GET",
      }),
      async onQueryStarted({ team, name }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              leadsApiSlice.util.updateQueryData(
                "getLeads",
                team,
                (draft) => data
              )
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
