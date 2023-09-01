import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coin, Portfolio, PortfolioLine} from './models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  // Currencies:

  getCurrencies(): Observable<Coin[]> {
    return this.http.get(`${this.baseUrl}/coins`) as Observable<any[]>;
  }

  getCurrency(currencyId: number): Observable<Coin> {
    return this.http.get(`${this.baseUrl}/coins/${currencyId}`) as Observable<Coin>;
  }

  createCurrency(currency: Coin): Observable<Coin> {
    return this.http.post(`${this.baseUrl}/coins`, currency) as Observable<Coin>;
  }

  updateCurrency(currency: Coin): Observable<Coin> {
    return this.http.put(`${this.baseUrl}/coins/${currency.id}`, currency) as Observable<Coin>;
  }

  deleteCurrency(currencyId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/coins/${currencyId}`);
  }

  // Portfolios:

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get(`${this.baseUrl}/portfolios`) as Observable<Portfolio[]>;
  }

  getPortfolio(portfolioId: number): Observable<Portfolio> {
    return this.http.get(`${this.baseUrl}/portfolios/${portfolioId}`) as Observable<Portfolio>;
  }

  createPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post(`${this.baseUrl}/portfolios`, portfolio) as Observable<Portfolio>;
  }

  updatePortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.put(`${this.baseUrl}/portfolios/${portfolio.id}`, portfolio) as Observable<Portfolio>;
  }

  deletePortfolio(portfolioId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/portfolios/${portfolioId}`);
  }

  // Portfolio lines:

  getPortfolioLines(portfolioId: number): Observable<PortfolioLine[]> {
    return this.http.get(`${this.baseUrl}/portfolios/${portfolioId}/lines`) as Observable<PortfolioLine[]>;
  }

  getPortfolioLine(portfolioId: number, portfolioLineId: number): Observable<PortfolioLine> {
    return this.http.get(`${this.baseUrl}/portfolios/${portfolioId}/lines/${portfolioLineId}`) as Observable<PortfolioLine>;
  }

  createPortfolioLine(portfolioId: number, portfolioLine: PortfolioLine): Observable<PortfolioLine> {
    portfolioLine.portfolioId = portfolioId;
    return this.http.post(`${this.baseUrl}/lines`, portfolioLine) as Observable<PortfolioLine>;
  }

  updatePortfolioLine(portfolioId: number, portfolioLine: PortfolioLine): Observable<PortfolioLine> {
    portfolioLine.portfolioId = portfolioId;
    return this.http.put(`${this.baseUrl}/lines/${portfolioLine.id}`, portfolioLine) as Observable<PortfolioLine>;
  }

  deletePortfolioLine(portfolioLineId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/lines/${portfolioLineId}`);
  }

}
