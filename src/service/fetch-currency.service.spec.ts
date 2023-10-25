import { TestBed } from '@angular/core/testing';

import { FetchCurrencyService } from './fetch-currency.service';

describe('FetchCurrencyService', () => {
  let service: FetchCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
