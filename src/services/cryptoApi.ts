import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coinranking } from './cryptoApi.types';

export const AUTH_API_REDUCER_KEY = 'cryptoApi';

const cryptoApiHeaders = {
  'Content-Type': 'application/json',
  'x-access-token': 'coinrankingfc4dc833da76198b168743ce9a509c139566e7f908022973',
  'Access-Control-Allow-Origin': '*',
};

const baseUrl = 'https://api.coinranking.com/v2/';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: proxyUrl + baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Coinranking, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
