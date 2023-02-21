import { apiSlice } from "api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/api/token/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: "/api/users/me/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: "/api/token/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetUserQuery,
  useSignUpMutation,
  useLogOutMutation,
} = authApiSlice;
