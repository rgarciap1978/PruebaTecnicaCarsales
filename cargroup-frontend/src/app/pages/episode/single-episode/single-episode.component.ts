import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode } from 'src/app/model/episode';
import { EpisodeService } from 'src/app/service/episode.service';

@Component({
  selector: 'app-single-episode',
  templateUrl: './single-episode.component.html',
  styleUrls: ['./single-episode.component.css']
})
export class SingleEpisodeComponent {
  id: number;
  episode: Episode;

  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });
    this.episodeService.getEpisodeById(this.id).subscribe(data => {
      this.episode = data;
    });
  }

  goBack() {
    this.location.back();
  }

}
