import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodesDTO } from 'src/app/dto/episodesDTO';
import { GenericDTO } from 'src/app/dto/genericDTO';
import { Episode } from 'src/app/model/episode';
import { EpisodeService } from 'src/app/service/episode.service';

@Component({
  selector: 'app-single-episode',
  templateUrl: './single-episode.component.html',
  styleUrls: ['./single-episode.component.css']
})
export class SingleEpisodeComponent {
  id: number;
  response: GenericDTO<EpisodesDTO> = {
    Success: false,
    ErrorMessage: '',
    results: {
      id: 0,
      name: '',
      air_date: '',
      episode: '',
      characters: [],
      url: '',
      created: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });

    this.episodeService.findById(this.id).subscribe(data => {
      this.response = data;
    });
  }

  goBack() {
    this.location.back();
  }

}
