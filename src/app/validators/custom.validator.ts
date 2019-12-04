import { AbstractControl } from '@angular/forms';
import { SignUpComponent } from '../authentication/sign-up/sign-up.component';
export function phoneEmailValidator(control: AbstractControl) {
  console.log(control.value);
  // if (!control.value.startsWith('https') || !control.value.includes('.me')) {
  //   return { urlValid: true };
  // }
  return null;

}


