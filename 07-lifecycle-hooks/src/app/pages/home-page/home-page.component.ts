import { afterNextRender, afterRender, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  traditionalProperty: string = 'Fernando';
  reactiveProperty = signal('Fernando');

  constructor() {
    console.log('HomePageComponent constructor llamado');

    // setTimeout(() => {
    //   this.traditionalProperty = 'Juan Pérez';
    //   //this.reactiveProperty.set('Juan Pérez');
    // }, 2000);
  }

  basicEffect = effect((onCleanup) => {
    console.log('HomePageComponent effect llamado');

    onCleanup(() => {
      console.log('HomePageComponent effect cleanup llamado');
    });
  });

  ngOnInit() {
    console.log('HomePageComponent ngOnInit llamado');
  }
  ngOnChanges() {
    console.log('HomePageComponent ngOnChanges llamado');
  }
  ngDoCheck() {
    console.log('HomePageComponent ngDoCheck llamado');
  }
  ngAfterContentInit() {
    console.log('HomePageComponent ngAfterContentInit llamado');
  }
  ngAfterContentChecked() {
    console.log('HomePageComponent ngAfterContentChecked llamado');
  }
  ngAfterViewInit() {
    console.log('HomePageComponent ngAfterViewInit llamado');
  }
  ngAfterViewChecked() {
    console.log('HomePageComponent ngAfterViewChecked llamado');
  }

  ngOnDestroy() {
    console.log('HomePageComponent ngOnDestroy llamado');
  }

  afterNextRenderEffect = afterNextRender(() => {
    console.log('HomePageComponent afterNextRender llamado');
  });

  afterRenderEffect = afterRender(() => {
    console.log('HomePageComponent afterRender llamado');
  });
}
