import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Whereabouts } from '../model/whereabouts';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url: string = `${environment.HOST}/locations`;

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get(this.url);
  }

  getLocationById(id: number) {
    return this.http.get<Whereabouts>(`${this.url}/${id}`);
  }

  getMultipleLocations(ids: string) {
    return this.http.get(`${this.url}/${ids}`);
  }
}
