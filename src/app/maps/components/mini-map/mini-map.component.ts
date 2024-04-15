import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
  
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit() {
    if(!this.divMap?.nativeElement) throw 'Map Div no puede ser nulo';
    if(!this.lngLat) throw 'Longitud y Latitud no puede ser nulo';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      accessToken: environment.mapbox_key,
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
  }
}
