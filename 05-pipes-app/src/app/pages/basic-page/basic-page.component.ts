import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

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

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      console.log('tick!')
      this.customDate.set(new Date())
    }, 1000);
    onCleanUp(() => {
      clearInterval(interval)
    })
  })
}
