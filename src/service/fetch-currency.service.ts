import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FetchCurrencyService {
  //https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes
  _url = 'https://v6.exchangerate-api.com/v6/';
  constructor(private _http: HttpClient) {}

  fetchExchange() {
    const fullUrl = 'https://api.monobank.ua/bank/currency';
    const result = this._http.get(fullUrl);
    return result;
  }

  fetchCurrency() {
    const key = environment.API_key;
    const fullUrl = `${this._url}${key}/codes`;
    const result = this._http.get(fullUrl, {
      observe: 'body',
      responseType: 'json',
    });
    return result;
  }

  fetchConvertedCurrency(amount: number | null, from: string, to: string) {
    // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP/AMOUNT
    const key = environment.API_key;
    const fullUrl = `${this._url}${key}/pair/${from}/${to}/${amount}`;
    const result = this._http
      .get(fullUrl, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
