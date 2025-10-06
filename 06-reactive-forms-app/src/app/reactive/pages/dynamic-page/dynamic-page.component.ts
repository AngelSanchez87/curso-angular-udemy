import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  newFavorite = this.fb.control('', Validators.required);

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ], [Validators.minLength(3)])
  });

  get favorites() {
    return this.myForm.get('favorites') as FormArray
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    this.favorites.push(this.fb.control(this.newFavorite.value, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favorites.removeAt(index);
  }

  onSubmit(){
    this.myForm.markAllAsTouched()
  }

}
