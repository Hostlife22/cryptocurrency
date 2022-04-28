import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coinranking } from './cryptoApi.types';
import { CryptoDetailCoin } from './cryptoApiCoin.types';
import { CryptoHistory } from './cryptoApiHistory.types';

export enum Time {
  Hours = '3h',
  Day = '24h',
  Weak = '7d',
  Month = '30d',
  Year = '1y',
  ThreeMonths = '3m',
  ThreeYears = '3y',
  FiveYears = '5y',
}

type CoinHistoryType = {
  coinId: string | undefined;
  timePeriod: Time;
};

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': '9d8982b9d6msh66911b2988be85ap19edbajsnce665143e14c',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Coinranking, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<CryptoDetailCoin, string | undefined>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<CryptoHistory, CoinHistoryType>({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
