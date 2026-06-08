import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const dateParts = control.value.split('-');
    const inputDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      return { pastDate: true };
    }
    return null;
  };
}
