import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('maps') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-107.65626006978415, 24.817954422176882);
  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento No Encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      accessToken: environment.mapbox_key,
      center: this.currentLngLat,
      zoom: 10, // starting zoom
    });

    this.ReadToLocalStorage();

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Fernando Herrera'

    // const marker = new Marker({
    //   // color: 'red'
    //   element: markerHTML
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  createMarker(){
    if(!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return;
    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color, marker
    });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage())
  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
    
  }
  ReadToLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat
      const cords = new LngLat(lng, lat)
      this.addMarker(cords, color);
    })

  }
}
