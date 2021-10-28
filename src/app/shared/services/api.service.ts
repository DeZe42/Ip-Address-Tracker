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
    
  }

  getIpAddressDetails(ipAddress?) {
    if (ipAddress) {
      this.http.get(environment.apiIpAddressDetailsURL + ipAddress + '/json?token=' + environment.apiKey).subscribe(res => {
        this.ipAddressDetails$.next(res);
      });
    } else {
      this.http.get(environment.apiIpAddressDetailsURL + 'json?token=' + environment.apiKey).subscribe(res => {
        this.ipAddressDetails$.next(res);
      });
    }
  }
}