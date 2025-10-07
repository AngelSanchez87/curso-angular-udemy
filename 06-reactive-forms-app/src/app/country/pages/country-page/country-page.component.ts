import { Component, effect, inject, signal } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { Country } from '../../intefaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils // Para poder usar los metodos estaticos en el html
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([])
  borders = signal<Country[]>([])

  myForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    region: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  // formRegionChanged = this.myForm.get('region')!.valueChanges.subscribe(region => {
  //   console.log({ region });
  // })

  onFormChanged = effect((onCleanUp) => {
    const regionSubscriptions = this.onRegionChanged();
    const countrySubscriptions = this.onCountryChanged();
    onCleanUp(() => {
      regionSubscriptions.unsubscribe();
      countrySubscriptions.unsubscribe();
    });
  })

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => { this.myForm.get('country')!.setValue('') }),
        tap(() => { this.myForm.get('border')!.setValue('') }),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region)),
      )
      .subscribe(countries => { this.countriesByRegion.set(countries) });
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => { this.myForm.get('border')!.setValue('') }),
        tap(() => { this.borders.set([]); }),
        filter(value => value.length > 0),
        switchMap(code => this.countryService.getCountryByAlphaCode(code)),
        switchMap(country => this.countryService.getCountryNamesByCodes(country.borders))
      )
      .subscribe(borders => { this.borders.set(borders) });
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
