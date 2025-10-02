import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localesES from '@angular/common/locales/es'
import localesFR from '@angular/common/locales/fr'
import { LocaleService } from './services/locale.service';

registerLocaleData(localesES, 'es')
registerLocaleData(localesFR, 'fr')

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      //useValue: 'es'
      deps: [LocaleService],
      useFactory: (localService: LocaleService) => {
        return localService.getLocale
      }
    }
  ]
};
