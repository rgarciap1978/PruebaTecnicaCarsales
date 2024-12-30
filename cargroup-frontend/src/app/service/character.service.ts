import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { characterFilter } from '../model/characterFilter';
import { GenericService } from './generic.service';
import { CharactersDTO } from '../dto/charactersDTO';
import { GenericDTO } from '../dto/genericDTO';


@Injectable({
  providedIn: 'root'
})
export class CharacterService extends GenericService<GenericDTO<CharactersDTO>> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}character`);
  }

  filter(characterFilter: characterFilter) {

    let filter = "";
    if(characterFilter.page != null && characterFilter.page != '') filter += `page=${characterFilter.page}&`;
    if(characterFilter.name != null && characterFilter.name != '') filter += `name=${characterFilter.name}&`;
    if(characterFilter.status != null && characterFilter.status != '') filter += `status=${characterFilter.status}&`;
    if(characterFilter.species != null && characterFilter.species != '') filter += `species=${characterFilter.species}&`;
    if(characterFilter.type != null && characterFilter.type != '') filter += `type=${characterFilter.type}&`;
    if(characterFilter.gender != null && characterFilter.gender != '') filter += `gender=${characterFilter.gender}&`;
    if(filter != "") filter = filter.substring(0, filter.length - 1);

    return this.http.get(`${this.url}/filter?${filter}`);
  }
}
