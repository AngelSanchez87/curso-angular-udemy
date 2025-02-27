import { Component, Input } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  standalone: true,
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css'
})
export class GifsListItemComponent {
  @Input() imageUrl: string = ''
}
