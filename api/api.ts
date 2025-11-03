// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }), // адрес твоего бэкенда
//   endpoints: (builder) => ({
//     getUsers: builder.query<any, void>({
//       query: () => "/users",
//     }),
//     addUser: builder.mutation<any, { username: string; email: string }>({
//       query: (user) => ({
//         url: "/users",
//         method: "POST",
//         body: user,
//       }),
//     }),
//   }),
// });

// export const { useGetUsersQuery, useAddUserMutation } = api;
