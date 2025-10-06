import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {
  //  myForm = new FormGroup({
  //    name: new FormControl(''),
  //    price: new FormControl(0),
  //    inStorage: new FormControl(0),
  //  });

  // CON FORM BUILDER ES MAS SENCILLO
  fb = inject(FormBuilder);
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Marca todos los campos como tocados para que se muestren los errores si los hay
      return;
    }

    this.myForm.reset({ price: 0, inStorage: 0 }); // Resetea el formulario y establece los valores por defecto
  }
}
