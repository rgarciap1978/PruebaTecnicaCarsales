import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from '../model/character';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url: string = `${environment.HOST}/characters`;

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get(this.url);
  }

  getCharacterById(id: number) {
    return this.http.get<Character>(`${this.url}/${id}`);
  }

  getMultipleCharacters(ids: string) {
    return this.http.get(`${this.url}/${ids}`);
  }
}
