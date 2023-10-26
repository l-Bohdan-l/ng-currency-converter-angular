import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FetchCurrencyService } from 'src/service/fetch-currency.service';

type ExchangeType = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateCross: number;
  rateSell: number;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../styles.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _fetchServices: FetchCurrencyService) {}
  uahToUsdExchangeRate: ExchangeType | undefined;
  uahToEurExchangeRate: ExchangeType | undefined;
  ngOnInit(): void {
    from(this._fetchServices.fetchExchange()).subscribe({
      next: (data: any) => {
        this.uahToUsdExchangeRate = data[0];
        this.uahToEurExchangeRate = data[1];
      },
    });
  }
}
