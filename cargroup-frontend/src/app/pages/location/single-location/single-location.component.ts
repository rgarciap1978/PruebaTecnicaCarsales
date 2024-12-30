import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericDTO } from 'src/app/dto/genericDTO';
import { SettingsDTO } from 'src/app/dto/settingsDTO';
import { Setting } from 'src/app/model/setting';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-single-location',
  templateUrl: './single-location.component.html',
  styleUrls: ['./single-location.component.css']
})
export class SingleLocationComponent {

  id: number;
  response: GenericDTO<SettingsDTO> = {
    Success: false,
    ErrorMessage: '',
    results: {
      id: 0,
      name: '',
      type: '',
      dimension: '',
      residents: [],
      url: '',
      created: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });

    this.locationService.findById(this.id).subscribe(data => {
      this.response = data;
    })
  }

  goBack() {
    this.location.back();
  }
}
