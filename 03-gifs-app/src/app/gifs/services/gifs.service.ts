import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}'
  const gifs = JSON.parse(gifsFromLocalStorage)
  //console.log(gifs)
  return gifs
}

@Injectable({providedIn: 'root'})
export class GifsService {

  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false)
  private trendingPage = signal(0)

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i +3))
    }

    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor(private httpClient: HttpClient) {
    this.loadTrendingGifs()
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem('gifs', historyString)
  })


  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return

    this.trendingGifsLoading.set(true)

    this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGipyItemsToGifArray(resp.data)
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs])
      this.trendingGifsLoading.set(false)
      this.trendingPage.update(currentValue => currentValue + 1)
      //console.log(gifs)
    })
  }

  searchGifs(query: string) {
    return this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    })
    .pipe(
      //tap(resp => console.log())
      map(({data}) => data),
      map(items => GifMapper.mapGipyItemsToGifArray(items)),


      //Historial
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(key: string): Gif[] {
    return this.searchHistory()[key] ?? []
  }

}
