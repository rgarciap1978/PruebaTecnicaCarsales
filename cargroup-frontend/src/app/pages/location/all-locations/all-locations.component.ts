import { Component } from '@angular/core';
import { WhereaboutsDTO } from 'src/app/dto/whereaboutsDTO';
import { Whereabouts } from 'src/app/model/whereabouts';
import { Paginator } from 'src/app/model/paginator';
import { LocationService } from 'src/app/service/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.css']
})
export class AllLocationsComponent {

  info: Paginator;
  results: Whereabouts[] = [];

  searchInput: string = '';

  constructor(
    private router: Router,
    private locationService: LocationService
  ) {}

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
    let n = ids.split(',');
    if (n.length > 1) {
      this.locationService.getMultipleLocations(ids).subscribe((data: Whereabouts[]) => {
        this.results = data;
      });
    }else{
      this.router.navigate([`pages/location/single-location/${n[0]}`]);
    }
  }

  resetForm(){
    this.searchInput = '';
    this.loadPage();
  }

}
