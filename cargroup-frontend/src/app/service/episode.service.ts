import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { EpisodesDTO } from '../dto/episodesDTO';
import { EpisodeFilter } from '../model/episodeFilter';
import { GenericDTO } from '../dto/genericDTO';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService extends GenericService<GenericDTO<EpisodesDTO>> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}episode`);
  }

  filter(episodeFilter: EpisodeFilter) {

    let filter = "";
    if(episodeFilter.page != null && episodeFilter.page != '') filter += `page=${episodeFilter.page}&`;
    if(episodeFilter.name != null && episodeFilter.name != '') filter += `name=${episodeFilter.name}&`;
    if(episodeFilter.episode != null && episodeFilter.episode != '') filter += `type=${episodeFilter.episode}&`;
    if(filter != "") filter = filter.substring(0, filter.length - 1);

    return this.http.get(`${this.url}/filter?${filter}`);
  }

}
