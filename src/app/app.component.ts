import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Currency } from './currency';
import { FetchCurrencyService } from './fetch-currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currencyConverter';
  currencies: string[] = ['USD', 'EUR', 'UAH'];
  supportedCodes: string[][] = [];
  currencyModel = new Currency(null, '', null, '');
  result = '';
  errorMsg = '';
  uahToUsdExchangeRate: any;
  uahToEurExchangeRate: any;
  exchangeFrom = '';
  exchangeTo = '';

  constructor(
    private formBuilder: FormBuilder,
    private _fetchServices: FetchCurrencyService
  ) {}
  async ngOnInit(): Promise<void> {
    (await this._fetchServices.fetchExchange()).subscribe((data: any) => {
      this.uahToUsdExchangeRate = data[0];
      this.uahToEurExchangeRate = data[1];
    });

    (await this._fetchServices.fetchCurrency()).subscribe((data: any) => {
      this.supportedCodes = [...data.supported_codes];
      this.supportedCodes.map((code: any) => {
        this.currencies.push(code[0]);
      });
    });
  }

  async handleChange(convert: any) {
    this.errorMsg = '';
    if (
      !this.currencyModel.currencyToValue ||
      !this.currencyModel.changeFrom ||
      !this.currencyModel.changeTo ||
      !this.currencyModel.currencyFromValue
    ) {
      return;
    }
    if (convert === 'convertFrom') {
      (
        await this._fetchServices.fetchConvertedCurrency(
          this.currencyModel.currencyFromValue,
          this.currencyModel.changeFrom,
          this.currencyModel.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          (this.currencyModel.currencyToValue = data.conversion_result),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
    if (convert === 'convertTo') {
      (
        await this._fetchServices.fetchConvertedCurrency(
          this.currencyModel.currencyFromValue,
          this.currencyModel.changeFrom,
          this.currencyModel.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          (this.currencyModel.currencyFromValue = data.conversion_result),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
  }
}
