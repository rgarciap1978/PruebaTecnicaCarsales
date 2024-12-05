import { Component } from '@angular/core';
import { WhereaboutsDTO } from 'src/app/dto/whereaboutsDTO';
import { Whereabouts } from 'src/app/model/whereabouts';
import { Paginator } from 'src/app/model/paginator';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent {

  info: Paginator;
  results: Whereabouts[] = [];

  searchInput: string = '';

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.locationService.getLocations().subscribe((data: WhereaboutsDTO) => {
      this.info = data.info;
      this.results = data.results;

    })
  }

  multipleSearch(){

    let ids = this.searchInput;
    console.log('multipleSearch: ' + ids);

    this.locationService.getMultipleLocations(ids).subscribe((data: Whereabouts[]) => {
      this.results = data;
    })

  }

  resetForm(){
    this.searchInput = '';
    this.loadPage();
  }

}
