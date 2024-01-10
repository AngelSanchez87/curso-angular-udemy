
import { Component } from '@angular/core';

const counterbase = 100

@Component({
  selector: 'app-counter',
  template: `
    <h3>Counter: {{ counter }}</h3>
    <button (click)="increaseBy(1)">+1</button>
    <button (click)="resetCounter()">Reset</button>
    <button (click)="increaseBy(-1)">-1</button>
    `
})
export class CounterComponent {
  constructor() { }

  public counter: number = counterbase;

  increaseBy(value: number): void {
    this.counter += value;
  }

  resetCounter(): void {
    this.counter = counterbase
  }
}
