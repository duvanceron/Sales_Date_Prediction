import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  private fieldLabels: { [key: string]: string } = {
    empid: 'Empleado',
    shipperid: 'Transportador',
  };
  constructor() {}
  getErrorMessage(
    control: AbstractControl | null,
    controlName: string
  ): string {
    if (!control || !control.errors) return '';

    const fieldLabel = this.fieldLabels[controlName] || controlName;

    return control.hasError('required')
      ? `${fieldLabel} es requerido`
      : control.hasError('pattern')
      ? `${fieldLabel} tiene un formato inválido`
      : control.hasError('min')
      ? `${fieldLabel} es menor al valor mínimo permitido`
      : control.hasError('maxlength')
      ? `${fieldLabel} excede el largo máximo permitido`
      : `${fieldLabel} es inválido`;
  }
}
