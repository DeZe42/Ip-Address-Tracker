import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './shared/services/api.service';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  inputCtrl: FormControl = new FormControl('');
  ipAddressData;
  change;
  lon;
  lat;

  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.apiService.getIpAddressDetails();
    this.dataService.isLoading$.subscribe(res => {
      this.change = res;
    });
    this.apiService.ipAddress$.subscribe(res => {
      this.dataService.isLoading$.next(true);
      if (res) {
        this.inputCtrl.setValue(res.ip);
      }
    })
    this.apiService.ipAddressDetails$.subscribe(res => {
      if (res) {
        this.inputCtrl.setValue(res.ip);
        this.ipAddressData = res;
        this.lat = res.loc.split(',')[0];
        this.lon = res.loc.split(',')[1];
        this.dataService.isLoading$.next(false);
      }
    });
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      this.getIpAddressDetails();
    }
  }

  getIpAddressDetails() {
    if (this.inputCtrl.value != '') {
      this.dataService.isLoading$.next(true);
      this.change = true;
      this.apiService.getIpAddressDetails(this.inputCtrl.value);
    }
  }

  getIsp(data) {
    if (data) return data.substr(data.indexOf(" ") + 1);
  }
}