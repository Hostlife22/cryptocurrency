export interface Link {
  name: string;
  url: string;
  type: string;
}

export interface Supply {
  confirmed: boolean;
  total: string;
  circulating: string;
}

export interface AllTimeHigh {
  price: string;
  timestamp: number;
}

export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Link[];
  supply: Supply;
  numberOfMarkets: number;
  numberOfExchanges: number;
  '24hVolume': string;
  marketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  allTimeHigh: AllTimeHigh;
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
}

export interface Data2 {
  coin: Coin;
}

export interface CryptoDetailCoin {
  status: string;
  data: Data2;
}
