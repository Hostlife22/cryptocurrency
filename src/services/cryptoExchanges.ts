export interface Stats {
  '24hVolume': string;
  total: number;
}

export interface Exchange {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  verified: boolean;
  recommended: boolean;
  numberOfMarkets: number;
  numberOfCoins: number;
  marketShare: string;
  coinrankingUrl: string;
  '24hVolume': string;
}

export interface Data {
  stats: Stats;
  exchanges: Exchange[];
}

export interface IExchangesData {
  status: string;
  data: Data;
}
