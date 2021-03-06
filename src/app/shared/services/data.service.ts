import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {

  }
}