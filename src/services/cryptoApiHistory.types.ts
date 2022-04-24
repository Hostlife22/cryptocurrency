interface History {
  price: string;
  timestamp: number;
}

interface Data {
  change: string;
  history: History[];
}
export interface CryptoHistory {
  data: Data;
  status: string;
}
