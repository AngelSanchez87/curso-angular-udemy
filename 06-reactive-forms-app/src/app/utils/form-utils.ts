import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  static isValidField(formGroup: FormGroup, field: string): boolean | null {
    return !!formGroup.controls[field].errors && formGroup.controls[field].touched;
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldError(formGroup: FormGroup, field: string): string | null {
    if (!formGroup.controls[field]) return null;
    const errors = formGroup.controls[field].errors ?? {};
    return FormUtils.getErrorMessage(errors);
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getErrorMessage(errors);
  }

  private static getErrorMessage(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`;
      }
    }
    return null;
  }
}
