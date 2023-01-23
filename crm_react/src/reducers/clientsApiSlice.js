import { apiSlice } from "api/apiSlice";

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: ({ id, page }) => ({
        url: `/api/clients/get_client/${id}/?page=${page}`,
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
      query: ({ team, name, page }) => ({
        url: `/api/clients/search_client/${team}/?search=${name}&page=${page}`,
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
