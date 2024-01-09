import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
  ],
  template: `
    <app-title [title]="currentFramework()" />
    <pre>{{frameworkAsSignal() | json}}</pre>
    <pre>{{frameworkAsProperty | json}}</pre>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChangeDetectionComponent { 
  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  )

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  })

  public frameworkAsProperty = {
    nombre: 'Angular',
    releaseDate: 2016
  };

  constructor() {
    setTimeout(() => {
      //this.frameworkAsProperty.releaseDate = 2019;
      this.frameworkAsSignal.update(value => 
        ({
          ...value,
          name: 'React'
        }));
      console.log('Hecho');
    }, 3000)
  }
}
