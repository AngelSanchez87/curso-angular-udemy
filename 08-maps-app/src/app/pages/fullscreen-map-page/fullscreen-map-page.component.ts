import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapBoxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrl: './fullscreen-map-page.component.css'
})
export class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  zoom = signal(14);
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal<{ lng: number; lat: number }>({ lng: -74.5, lat: 40 });

  zoomEffect = effect(() => {
    const map = this.map();
    if (!map) return;

    map.setZoom(this.zoom());
    //map.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 80));

    const element = this.divElement()!.nativeElement
    const { lng, lat } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', () => {
      this.zoom.set(map.getZoom());
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('Map loaded');
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
