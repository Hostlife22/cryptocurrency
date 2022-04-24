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
