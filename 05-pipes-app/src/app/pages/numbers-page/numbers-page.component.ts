import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, PercentPipe, CurrencyPipe],
  templateUrl: './numbers-page.component.html',
  styleUrl: './numbers-page.component.css'
})
export default class NumbersPageComponent {
  totalSells = signal(244_456_565.5567)
  percent = signal(0.4565)
}
