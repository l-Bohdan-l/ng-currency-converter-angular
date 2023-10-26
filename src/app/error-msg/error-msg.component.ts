import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss'],
})
export class ErrorMsgComponent {
  @Input() formTouched: boolean | undefined;
  @Input() formIsInvalid: boolean | undefined;
  @Input()
  currencyValueInvalid: boolean | undefined;
  @Input()
  currencyValueTouched: boolean | undefined;
  @Input()
  currencyValueRequired: boolean | undefined;
  @Input()
  currencyValueMinLength: boolean | undefined;
  @Input()
  currencyInvalid: boolean | undefined;
  @Input()
  errorMsg: string | undefined;
}
