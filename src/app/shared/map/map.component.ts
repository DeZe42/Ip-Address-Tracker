import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit, OnChanges {

  isLoading: boolean = false;
  map;
  @Input('lat') lat;
  @Input('lon') lon;
  @Input('change') change;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.isLoading$.subscribe(res => {
      this.isLoading = res;
    });
  }

  ngAfterViewInit(): void {
    if (this.lat && this.lon) {
      this.initMap();
    }
  }

  ngOnChanges() {
    if (this.lat && this.lon) {
      if (this.map && this.change) {
        this.map.off();
        this.map.remove();
        this.initMap();
      } else {
        if (this.map) {
          this.map.off();
          this.map.remove();
        }
        this.initMap();
      }
    }
  }

  initMap() {
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      zoom: 14
    });
    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      minZoom: 3,
      attribution: "&copu; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
    });
    tiles.addTo(this.map);
  }
}