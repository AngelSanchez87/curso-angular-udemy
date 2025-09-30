import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  countryService = inject(CountryService)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam))

  selectRegion(region: Region) {
    this.selectedRegion.set(region)
  }

  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = linkedSignal(() => this.queryParam)
  router = inject(Router)

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([])

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.region
        }
      })
      return this.countryService.searchByRegion(request.region)
    }
  })
}

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase()

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas'
}
