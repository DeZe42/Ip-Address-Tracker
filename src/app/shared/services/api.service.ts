import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ipAddress$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ipAddressDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) {
    this.getUserIpAddress();
  }

  getUserIpAddress() {
    this.http.get(environment.apiIpAddressURL).subscribe(res => {
      this.ipAddress$.next(res);
    });
  }

  getIpAddressDetails(ipAddress) {
    this.http.get(environment.apiIpAddressDetailsURL + ipAddress).subscribe(res => {
      this.ipAddressDetails$.next(res);
    });
  }
}