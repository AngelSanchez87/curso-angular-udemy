import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapBoxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrl: './fullscreen-map-page.component.css'
})
export class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  zoom = signal(14);
  map = signal<mapboxgl.Map | null>(null);

  zoomEffect = effect(() => {
    const map = this.map();
    if (!map) return;

    map.setZoom(this.zoom());
    //map.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', () => {
      this.zoom.set(map.getZoom());
    });

    this.map.set(map);
  }
}
