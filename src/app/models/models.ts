export interface Coin {
  id: number;
  acronym: string;
  name: string;
}

export interface Portfolio {
  id: number;
  name: string;
}

export interface PortfolioLine {
  id: number;
  portfolioId: number;
  coinId: number;
  amount: number;
}

export interface CryptoCompareData {
  Data: {
    [key: string]: {
      CoinName: string;
      Symbol: string;
    }
  }
}
