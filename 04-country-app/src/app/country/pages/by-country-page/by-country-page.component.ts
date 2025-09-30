import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  countryService = inject(CountryService)
  countries = signal<Country[]>([])
  //query = signal('')

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return []

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     )

  //   }
  // })
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([])

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      })
      return this.countryService.searchByCountry(request.query)
    }
  })
}
