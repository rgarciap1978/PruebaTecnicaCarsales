import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { SettingsDTO } from '../dto/settingsDTO';
import { SettingFilter } from '../model/settingFilter';
import { GenericDTO } from '../dto/genericDTO';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GenericService<GenericDTO<SettingsDTO>> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}location`);
  }

  filter(settingFilter: SettingFilter) {

    let filter = "";
    if(settingFilter.page != null && settingFilter.page != '') filter += `page=${settingFilter.page}&`;
    if(settingFilter.name != null && settingFilter.name != '') filter += `name=${settingFilter.name}&`;
    if(settingFilter.type != null && settingFilter.type != '') filter += `type=${settingFilter.type}&`;
    if(settingFilter.dimension != null && settingFilter.dimension != '') filter += `dimension=${settingFilter.dimension}&`;
    if(filter != "") filter = filter.substring(0, filter.length - 1);

    return this.http.get(`${this.url}/filter?${filter}`);
  }
}
