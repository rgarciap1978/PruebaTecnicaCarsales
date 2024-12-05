import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Whereabouts } from 'src/app/model/whereabouts';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.css']
})
export class SingleLocationComponent {

  id: number;
  whereabouts: Whereabouts;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });
    this.locationService.getLocationById(this.id).subscribe(data => {
      this.whereabouts = data;
    })
  }

  goBack() {
    this.location.back();
  }

}
