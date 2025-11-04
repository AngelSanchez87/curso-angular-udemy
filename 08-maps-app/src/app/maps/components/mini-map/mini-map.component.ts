import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapBoxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

   async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 80));

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false
    });

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(this.lngLat())
      .addTo(map);

  }

}
