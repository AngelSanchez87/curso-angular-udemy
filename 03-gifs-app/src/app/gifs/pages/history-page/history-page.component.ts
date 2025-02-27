import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'history-page',
  standalone: true,
  imports: [GifsListComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export default class HistoryPageComponent {
  gifsService = inject(GifsService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )

  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query())
  })

  // query = inject(ActivatedRoute).params.subscribe(
  //   params => console.log(params)
  // )
}

