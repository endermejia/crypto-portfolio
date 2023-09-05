import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Coin, CryptoCompareData, Portfolio, PortfolioLine} from './models/models';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverUrl = environment.serverUrl;
  private apiKey = environment.cryptocompareApiKey; // https://www.cryptocompare.com/cryptopian/api-keys

  constructor(
    private http: HttpClient
  ) {
  }

  getEurValueByAcronym(acronym: string): Observable<{ EUR: number }> {
    const cryptoValueUrl = `https://min-api.cryptocompare.com/data/price?fsym=${acronym}&tsyms=EUR`;
    return this.http.get(
      cryptoValueUrl,
      {headers: {authorization: `Apikey ${this.apiKey}`}}
    ) as Observable<{ EUR: number }>;
  }

  getCryptoCompareData(): Observable<CryptoCompareData> {
    return this.http.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .pipe(
        map((data: Partial<CryptoCompareData>) => {
          const cryptoCompareData: CryptoCompareData = {
            Data: {}
          };
          for (const key in data.Data) {
            cryptoCompareData.Data[key] = {
              CoinName: data.Data[key].CoinName,
              Symbol: data.Data[key].Symbol
            };
          }
          return cryptoCompareData;
        })
      ) as Observable<CryptoCompareData>;
  }

  // Currencies:

  getCurrencies(): Observable<Coin[]> {
    return this.http.get(`${this.serverUrl}/coins`) as Observable<Coin[]>;
  }

  getCurrency(currencyId: number): Observable<Coin> {
    return this.http.get(`${this.serverUrl}/coins/${currencyId}`) as Observable<Coin>;
  }

  createCurrency(currency: Coin): Observable<Coin> {
    return this.http.post(`${this.serverUrl}/coins`, currency) as Observable<Coin>;
  }

  updateCurrency(currency: Coin): Observable<Coin> {
    return this.http.put(`${this.serverUrl}/coins/${currency.id}`, currency) as Observable<Coin>;
  }

  deleteCurrency(currencyId: number): Observable<unknown> {
    return this.http.delete(`${this.serverUrl}/coins/${currencyId}`);
  }

  // Portfolios:

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get(`${this.serverUrl}/portfolios`) as Observable<Portfolio[]>;
  }

  getPortfolio(portfolioId: number): Observable<Portfolio> {
    return this.http.get(`${this.serverUrl}/portfolios/${portfolioId}`) as Observable<Portfolio>;
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post(`${this.serverUrl}/portfolios`, portfolio) as Observable<Portfolio>;
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.put(`${this.serverUrl}/portfolios/${portfolio.id}`, portfolio) as Observable<Portfolio>;
  }

  deletePortfolio(portfolioId: number): Observable<unknown> {
    return this.http.delete(`${this.serverUrl}/portfolios/${portfolioId}`);
  }

  // Portfolio lines:

  getPortfolioLines(portfolioId: number): Observable<PortfolioLine[]> {
    return this.http.get(`${this.serverUrl}/portfolios/${portfolioId}/lines`) as Observable<PortfolioLine[]>;
  }

  getPortfolioLine(portfolioId: number, portfolioLineId: number): Observable<PortfolioLine> {
    return this.http.get(`${this.serverUrl}/portfolios/${portfolioId}/lines/${portfolioLineId}`) as Observable<PortfolioLine>;
  }

  createPortfolioLine(portfolioId: number, portfolioLine: PortfolioLine): Observable<PortfolioLine> {
    portfolioLine.portfolioId = portfolioId;
    return this.http.post(`${this.serverUrl}/lines`, portfolioLine) as Observable<PortfolioLine>;
  }

  updatePortfolioLine(portfolioId: number, portfolioLine: PortfolioLine): Observable<PortfolioLine> {
    portfolioLine.portfolioId = portfolioId;
    return this.http.put(`${this.serverUrl}/lines/${portfolioLine.id}`, portfolioLine) as Observable<PortfolioLine>;
  }

  deletePortfolioLine(portfolioLineId: number): Observable<unknown> {
    return this.http.delete(`${this.serverUrl}/lines/${portfolioLineId}`);
  }

}
