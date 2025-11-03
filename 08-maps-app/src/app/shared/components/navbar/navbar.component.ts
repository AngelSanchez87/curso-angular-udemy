import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);

  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps Angular'}`
  })).filter(route => route.path !== '**');

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    //tap((event) => { console.log(event); }),
    map((event) => event.url),
    map(url => {
      return this.routes.find(route => `/${route.path}` === url)?.title ?? 'Maps Angular';
    })
  )

  //convertir observable en signal
  pageTitle =
    toSignal(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        //tap((event) => { console.log(event); }),
        map((event) => event.url),
        map(url => {
          return this.routes.find(route => `/${route.path}` === url)?.title ?? 'Maps Angular';
        })
      )
    )

}
