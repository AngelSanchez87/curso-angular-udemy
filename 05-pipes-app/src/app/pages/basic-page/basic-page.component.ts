import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export default class BasicPageComponent {
  nameLower = signal('angel')
  nameUpper = signal('ANGEL')
  fullName = signal('angEL SanCHEZ')

  customDate = signal(new Date())

  localeService = inject(LocaleService)

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      console.log('tick!')
      this.customDate.set(new Date())
    }, 1000);
    onCleanUp(() => {
      clearInterval(interval)
    })
  })

  changeLocal(locale: AvailableLocale) {
    this.localeService.changeLocale(locale)
  }
}
