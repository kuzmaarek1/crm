import { apiSlice } from "api/apiSlice";

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (id) => ({
        url: `/api/clients/get_client/${id}/`,
        method: "GET",
      }),
      providesTags: ["Client", "Auth", "Team", "Lead"],
    }),
    createClient: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/clients/create_client/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    editClient: builder.mutation({
      query: ({ client, team, data }) => ({
        url: `/api/clients/update_client/${client}/${team}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    searchClient: builder.query({
      query: ({ team, name }) => ({
        url: `/api/clients/search_client/${team}/?search=${name}`,
        method: "GET",
      }),
      async onQueryStarted({ team, name }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              clientsApiSlice.util.updateQueryData(
                "getClients",
                team,
                (draft) => data
              )
            );
          }
        } catch {}
      },
    }),
    deleteClient: builder.mutation({
      query: ({ client, team }) => ({
        url: `/api/clients/delete_client/${client}/${team}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useCreateClientMutation,
  useEditClientMutation,
  useSearchClientQuery,
  useDeleteClientMutation,
} = clientsApiSlice;
