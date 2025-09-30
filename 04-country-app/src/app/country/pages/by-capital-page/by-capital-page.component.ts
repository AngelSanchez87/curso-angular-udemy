import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService)
  isLoading = signal(false)
  isError = signal<string | null>(null)
  countries = signal<Country[]>([])

  onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true)
    this.isError.set(null)

    this.countryService
      .searchByCapital(query)
      // .subscribe(countries =>
      //   {
      //     this.isLoading.set(false)
      //     this.countries.set(countries)
      //   })
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false)
          this.countries.set(countries)
        },
        error: (err) => {
          this.isLoading.set(false)
          this.countries.set([])
          this.isError.set(err)
        },
      })

  }

  // con resources a partir de Angular 19
  //query = signal('')
  // countryResource = resource({
  //   request: () => ({  query: this.query() }),
  //   loader: async({ request } ) => {
  //     if (!request.query) return []

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     )

  //   }
  // })

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([])

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      })
      return this.countryService.searchByCapital(request.query)
    }
  })

  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)
}
