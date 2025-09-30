import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    console.log(`llegando al servidor para obtener informacion de: ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountriesToCountries(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching: ', error)
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${query}`))
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []).pipe(
        delay(2000)
      )
    }

    console.log(`llegando al servidor para obtener informacion de: ${query}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountriesToCountries(restCountries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        catchError(error => {
          console.log('Error fetching: ', error)
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${query}`))
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountriesToCountries(restCountries)),
        map(countries => countries.at(0)),
        //delay(3000),
        catchError(error => {
          console.log('Error fetching: ', error)
          return throwError(() => new Error(`No se pudo obtener paises con ese codigo: ${code}`))
        })
      );
  }


  searchByRegion(region: Region): Observable<Country[]> {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? [])
    }

    console.log(`llegando al servidor para obtener informacion de: ${region}`)

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountriesToCountries(restCountries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching: ', error)
          return throwError(() => new Error(`No se pudo obtener paises con ese query: ${region}`))
        })
      );
  }
}
