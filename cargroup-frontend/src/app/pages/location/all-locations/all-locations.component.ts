import { Component } from '@angular/core';
import { SettingsDTO } from 'src/app/dto/settingsDTO';
import { Paginator } from 'src/app/model/paginator';
import { LocationService } from 'src/app/service/location.service';
import { Router } from '@angular/router';
import { CollectionGenericDTO } from 'src/app/dto/collectionGenericDTO';
import { SettingFilter } from 'src/app/model/settingFilter';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent {

  info: Paginator;
  results: SettingsDTO[] = [];

  searchInput: string = '';
  searchName: string = '';
  searchType: string = '';
  searchDimension: string = '';

  enabledButtonPrevious: boolean = false;
  enabledButtonNext: boolean = false;

  constructor(
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.locationService.findAll().subscribe((data: CollectionGenericDTO<SettingsDTO>) => {
      this.info = data.info;
      this.results = data.results;

      this.enabledButton(this.info.prev, this.info.next);
    })
  }

  onSubmit(){
    let ids = this.searchInput;
    if (ids.length > 0) {
      let n = ids.split(',');
      if (n.length > 1) {
        this.locationService.findByMultipleId(ids).subscribe((data: CollectionGenericDTO<SettingsDTO>) => {
          this.results = data.results;

          this.enabledButton('', '');
        });
      } else {
        this.router.navigate([`pages/location/single-location/${n[0]}`]);
      }
    } else {
      let filter: SettingFilter = {
        page: null,
        name: this.searchName,
        type: this.searchType,
        dimension: this.searchDimension
      };

      this.locationService.filter(filter).subscribe((data: CollectionGenericDTO<SettingsDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }
  }

  resetForm(){
    this.searchInput = '';
    this.searchName = '';
    this.searchType = '';
    this.searchDimension = '';

    this.enabledButtonPrevious = false;
    this.enabledButtonNext = false;

    this.loadPage();
  }

  onPrevious() {
      let filter: SettingFilter = {
        page: this.info.prev,
        name: this.searchName,
        type: this.searchType,
        dimension: this.searchDimension
      };

      this.locationService.filter(filter).subscribe((data: CollectionGenericDTO<SettingsDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }

    onNext() {
      let filter: SettingFilter = {
        page: this.info.next,
        name: this.searchName,
        type: this.searchType,
        dimension: this.searchDimension
      };

      this.locationService.filter(filter).subscribe((data: CollectionGenericDTO<SettingsDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }

  enabledButton(previous, next){
    this.enabledButtonPrevious = (previous != '' ? true : false);
    this.enabledButtonNext = (next != '' ? true : false);
  }

}
