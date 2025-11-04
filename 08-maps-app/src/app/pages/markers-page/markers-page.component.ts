import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { v4 as UuidV4 } from 'uuid'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapBoxKey;

interface Marker {
  id: string;
  marker?: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.658126, 40.552591], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: 'red'
    // }).setLngLat([-3.658126, 40.552591]).addTo(map);

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const { lng, lat } = event.lngLat;
    const marker = new mapboxgl.Marker({
      draggable: false,
      color
    }).setLngLat([lng, lat]).addTo(this.map()!);

    this.markers.update((markers) => [{ id: UuidV4(), marker }, ...markers]);
  }

  flyToMarker(lngLat: mapboxgl.LngLatLike) {
    if (!this.map()) return;


    this.map()!.flyTo({ center: lngLat });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;

    const map = this.map()!;

    marker.marker?.remove();
    this.markers.update((markers) => markers.filter((m) => m.id !== marker.id));
  }
}
