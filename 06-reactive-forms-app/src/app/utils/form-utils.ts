import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {

  // Expresiones regulares reutilizables
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

  static isFieldOneEqualToFieldTwo(field1: string, field2: string): any {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;
      return value1 === value2 ? null : { notEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Checking server response...');

    await sleep();

    const value = control.value
    if (value === 'hola@mundo.es') {
      return {
        emailTaken: true
      }
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value === 'strider') {
      return {
        notStrider: true
      }
    }

    return null;
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
        case 'email':
          return `El valor debe ser un email válido.`;
        case 'emailTaken':
          return `Este correo electronico ya es usado por otro usuario`;
        case 'notStrider':
          return `El valor no puede ser 'strider'`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor debe ser un email válido.';
          }
          return `Error de patrón contra expresion regular`
        default:
          return `Error de validación desconocido`;
      }
    }
    return null;
  }
}
