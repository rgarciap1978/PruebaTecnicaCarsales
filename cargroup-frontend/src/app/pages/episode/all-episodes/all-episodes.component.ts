import { Component } from '@angular/core';
import { EpisodesDTO } from 'src/app/dto/episodesDTO';
import { Episode } from 'src/app/model/episode';
import { Paginator } from 'src/app/model/paginator';
import { EpisodeService } from 'src/app/service/episode.service';

@Component({
  selector: 'app-all-episodes',
  templateUrl: './all-episodes.component.html',
  styleUrls: ['./all-episodes.component.css']
})
export class AllEpisodesComponent {

  info: Paginator;
  results: Episode[] = [];

  searchInput: string = '';

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.episodeService.getEpisodes().subscribe((data: EpisodesDTO) => {
      this.info = data.info;
      this.results = data.results;
    })
  }

  multipleSearch(){

    let ids = this.searchInput;

    this.episodeService.getMultipleEpisodes(ids).subscribe((data: Episode[]) => {
      this.results = data;
    })

  }

  resetForm(){
    this.searchInput = '';
    this.loadPage();
  }
}
