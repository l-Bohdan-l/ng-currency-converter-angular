import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Currency } from './currency';
import { FetchCurrencyService } from './fetch-currency.service';

type ExchangeType = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateCross: number;
  rateSell: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _fetchServices: FetchCurrencyService
  ) {}

  title = 'currencyConverter';
  currencies: string[] = ['USD', 'EUR', 'UAH'];
  supportedCodes: string[][] = [];
  // currencyModel = new Currency(null, '', null, '');
  // result = '';
  errorMsg = '';
  uahToUsdExchangeRate: ExchangeType | undefined;
  uahToEurExchangeRate: ExchangeType | undefined;
  // exchangeFrom = '';
  // exchangeTo = '';
  // currencyForm = new FormGroup({
  //   currencyFromValue: new FormControl(null),
  //   changeFrom: new FormControl(''),
  //   currencyToValue: new FormControl(null),
  //   changeTo: new FormControl(''),
  // });
  currencyForm = this.formBuilder.group({
    currencyFromValue: [1, [Validators.required, Validators.min(1)]],
    changeFrom: ['', Validators.required],
    currencyToValue: [1, Validators.required],
    changeTo: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    // (await this._fetchServices.fetchExchange()).subscribe((data: any) => {
    //   this.uahToUsdExchangeRate = data[0];
    //   this.uahToEurExchangeRate = data[1];
    // });
    // (await this._fetchServices.fetchCurrency()).subscribe((data: any) => {
    //   this.supportedCodes = [...data.supported_codes];
    //   this.supportedCodes.map((code: any) => {
    //     this.currencies.push(code[0]);
    //   });
    // });
  }

  async handleChange(convert: any) {
    console.log('change', this.currencyForm);
    this.errorMsg = '';
    if (
      // !this.currencyModel.currencyToValue ||
      // !this.currencyModel.changeFrom ||
      // !this.currencyModel.changeTo ||
      // !this.currencyModel.currencyFromValue
      !this.currencyForm.value.changeFrom ||
      !this.currencyForm.value.changeTo ||
      !this.currencyForm.value.currencyFromValue ||
      !this.currencyForm.value.currencyToValue
    ) {
      return;
    }
    console.log('after empty');
    if (convert === 'convertFrom') {
      console.log('convertFrom');
      (
        await this._fetchServices.fetchConvertedCurrency(
          this.currencyForm.value.currencyFromValue,
          this.currencyForm.value.changeFrom,
          this.currencyForm.value.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          // (this.currencyModel.currencyToValue = data.conversion_result),
          this.currencyForm.patchValue({
            currencyToValue: data.conversion_result,
          }),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
    if (convert === 'convertTo') {
      console.log('convertTo');
      (
        await this._fetchServices.fetchConvertedCurrency(
          this.currencyForm.value.currencyToValue,
          this.currencyForm.value.changeFrom,
          this.currencyForm.value.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          // (this.currencyModel.currencyFromValue = data.conversion_result),
          this.currencyForm.patchValue({
            currencyFromValue: data.conversion_result,
          }),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
  }
}
