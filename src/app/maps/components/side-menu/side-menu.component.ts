import { Component } from '@angular/core';

interface MenuItem{
  route: string;
  name: string;

}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {route: '/maps/fullscreen', name: 'Full Screen'},
    {route: '/maps/zoom-range', name: 'Zoom'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
  ]
}
