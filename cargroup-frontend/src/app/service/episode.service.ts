import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Episode } from '../model/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private url: string = `${environment.HOST}/episodes`;

  constructor(private http: HttpClient) { }

  getEpisodes(){
    return this.http.get(this.url)
  }

  getEpisodeById(id: number) {
    return this.http.get<Episode>(`${this.url}/${id}`);
  }

  getMultipleEpisodes(ids: string) {
    return this.http.get(`${this.url}/${ids}`);
  }
}
