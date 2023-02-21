import { apiSlice } from "api/apiSlice";
import type { User, RegisterValues, LoginValues } from "types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<{ auth_token: string }, LoginValues>({
      query: (credentials) => ({
        url: "/api/token/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/api/users/me/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    signUp: builder.mutation<any, RegisterValues>({
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
