import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  countryService = inject(CountryService)
  countries = signal<Country[]>([])
  query = signal('')

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return []

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     )

  //   }
  // })

  countryResource = rxResource({
      request: () => ({  query: this.query() }),
      loader: ({ request } ) => {
        if (!request.query) return of([])
        return this.countryService.searchByCountry(request.query)
      }
    })
}
