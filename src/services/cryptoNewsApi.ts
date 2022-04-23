import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICryptoNewsDate, NewsCryptoQuery } from './cryptoNewsApi.types';

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': '9d8982b9d6msh66911b2988be85ap19edbajsnce665143e14c',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<ICryptoNewsDate, NewsCryptoQuery>({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
