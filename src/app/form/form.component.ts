import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { FetchCurrencyService } from 'src/service/fetch-currency.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../../styles.scss'],
})
export class FormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _fetchServices: FetchCurrencyService
  ) {}

  currencies: string[] = ['USD', 'EUR', 'UAH'];
  supportedCodes: string[][] = [];
  errorMsg = '';
  currencyForm = this.formBuilder.group({
    currencyFromValue: [1, [Validators.required, Validators.min(0)]],
    changeFrom: ['', Validators.required],
    currencyToValue: [1, [Validators.required, Validators.min(0)]],
    changeTo: ['', Validators.required],
  });

  ngOnInit(): void {
    from(this._fetchServices.fetchCurrency()).subscribe({
      next: (data: any) => {
        this.supportedCodes = [...data.supported_codes];
        this.supportedCodes.map((code: any) => {
          this.currencies.push(code[0]);
        });
      },
    });
  }

  handleChange(convert: any) {
    this.errorMsg = '';
    if (
      !this.currencyForm.value.changeFrom ||
      !this.currencyForm.value.changeTo ||
      !this.currencyForm.value.currencyFromValue ||
      !this.currencyForm.value.currencyToValue
    ) {
      return;
    }
    if (convert === 'convertFrom') {
      from(
        this._fetchServices.fetchConvertedCurrency(
          this.currencyForm.value.currencyFromValue,
          this.currencyForm.value.changeFrom,
          this.currencyForm.value.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          this.currencyForm.patchValue({
            currencyToValue: data.conversion_result,
          }),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
    if (convert === 'convertTo') {
      from(
        this._fetchServices.fetchConvertedCurrency(
          this.currencyForm.value.currencyToValue,
          this.currencyForm.value.changeFrom,
          this.currencyForm.value.changeTo
        )
      ).subscribe({
        next: (data: any) =>
          this.currencyForm.patchValue({
            currencyFromValue: data.conversion_result,
          }),
        error: (err) => (this.errorMsg = err.statusText),
      });
      return;
    }
  }
}
