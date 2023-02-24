import { apiSlice } from "api/apiSlice";
import type { LeadAndClientData } from "types";
import type {
  GetProps,
  CreateLeadAndClientProps,
  EditClientProps,
  SearchLeadAndClientProps,
  DeleteClientProps,
  CreateMessage,
  EditMessage,
  DeleteMessage,
} from "types/reducers";

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<LeadAndClientData, GetProps>({
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
    createClient: builder.mutation<CreateMessage, CreateLeadAndClientProps>({
      query: ({ id, data }) => ({
        url: `api/clients/create_client/${id}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    editClient: builder.mutation<EditMessage, EditClientProps>({
      query: ({ client, team, data }) => ({
        url: `/api/clients/update_client/${client}/${team}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    searchClient: builder.query<LeadAndClientData, SearchLeadAndClientProps>({
      query: ({ team, name, page }) => ({
        url: `/api/clients/search_client/${team}/?search=${name}&page=${page}`,
        method: "GET",
      }),
      async onQueryStarted({ team, name, page }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (name !== "") {
            dispatch(
              clientsApiSlice.util.updateQueryData(
                "getClients",
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
    deleteClient: builder.mutation<DeleteMessage, DeleteClientProps>({
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
