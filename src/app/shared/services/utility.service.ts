import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {

  }

  extractNumbers(str: string) {
    return str.replace(/[^\d.]/gi, "");
  }

  extractAlpha(str: string) {
    return str.replace(/[^A-Z]/gi, "");
  }

  convertToCurrency(str: string) {
    let formatted = str.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$ ${formatted}`;
  }

  public validationMessages(c: AbstractControl): { [key: string]: string } {
    let msgs: any = {};
    let currentErrors: ValidationErrors | null = c.errors;

    if (currentErrors) {

      if (currentErrors['required'])
        msgs.required = 'This is a required field.';

      if (currentErrors['pattern'])
        msgs.pattern = 'Please enter a valid value.';

      if (currentErrors['email'])
        msgs.email = 'Please enter a valid email address.';

      if (currentErrors['website'])
        msgs.website = 'Please enter a valid URL.';

      if (currentErrors['minlength'])
        msgs.minlength = `Cannot be less than ${currentErrors['minlength'].requiredLength} characters.`;

      if (currentErrors['maxlength'])
        msgs.maxlength = `Cannot be more than ${currentErrors['maxlength'].requiredLength} characters.`;

      if (currentErrors['number'])
        msgs.number = `Should be a proper number.`;

      if (currentErrors['decimal'])
        msgs.decimal = `Should be a floating point number.`;

      if (currentErrors['range'])
        msgs.range = `Should be within the range.`;
    }

    return msgs;
  }

  public getValidationMessages(c: AbstractControl): string {
    let validationMsg = "";

    let controlValidationMsgs = this.validationMessages(c);

    if ((c.touched || c.dirty) && c.errors) {
      validationMsg = Object.keys(c.errors).map(key => {
        console.log(`${c.value} | controlValidationMsgs[key] ${controlValidationMsgs[key]} | ${key}`);
        return controlValidationMsgs[key]
      }).join(' ');
    }

    return validationMsg;
  }

}
