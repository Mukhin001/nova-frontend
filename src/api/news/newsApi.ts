import { baseApi } from "../baseApi";

export interface NewsResponse {
  title: string;
  description: string;
  link: string;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse[], { category?: string; city: string }>(
      {
        query: ({ category, city }) => {
          const params = new URLSearchParams();

          if (category) params.set("category", category);
          if (city) params.set("city", city);

          return `/news?${params.toString()}`;
        },
        providesTags: ["News"],
      }
    ),
  }),
});

export const { useGetNewsQuery } = newsApi;
