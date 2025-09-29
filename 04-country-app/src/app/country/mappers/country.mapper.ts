
import type { Country } from '../interfaces/country.interface';
import type  { RESTCountry } from './../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(rest: RESTCountry): Country {
    return {
      cca2: rest.cca2,
      flag: rest.flag,
      flagSvg: rest.flags.svg,
      name: rest.translations["spa"].common,
      capital: rest.capital?.join(','),
      population: rest.population,
      region: rest.region,
      subregion: rest.subregion
    }
  }

  static mapRestCountriesToCountries(rest: RESTCountry[]) : Country[] {
    return rest.map(country => this.mapRestCountryToCountry(country))
  }
}
