import { baseApi } from "../baseApi";

export interface NewsResponse {
  title: string;
  description: string;
  link: string;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse[], { category?: string }>({
      query: ({ category }) =>
        `/news${category ? `?category=${category}` : ""}`,
      providesTags: ["News"],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
