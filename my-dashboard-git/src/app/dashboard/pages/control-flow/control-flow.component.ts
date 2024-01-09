import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A'|'B'|'F';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [
    CommonModule, TitleComponent
  ],
  templateUrl: './control-flow.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ControlFlowComponent {
  public showContent = signal(false)
  public grade = signal<Grade>('A')
  public frameworks = signal(['Angular','Vue','Svelte','Qwik','React'])
  public frameworks2 = signal([])

  public toggleContent() {
    this.showContent.update(value => !value)
  }
 }
