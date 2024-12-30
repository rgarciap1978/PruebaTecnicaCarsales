import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionGenericDTO } from 'src/app/dto/collectionGenericDTO';
import { EpisodesDTO } from 'src/app/dto/episodesDTO';
import { EpisodeFilter } from 'src/app/model/episodeFilter';
import { Paginator } from 'src/app/model/paginator';
import { EpisodeService } from 'src/app/service/episode.service';

@Component({
  selector: 'app-all-episodes',
  templateUrl: './all-episodes.component.html',
  styleUrls: ['./all-episodes.component.css']
})
export class AllEpisodesComponent {

  info: Paginator;
  results: EpisodesDTO[] = [];

  searchInput: string = '';
  searchName: string = '';
  searchEpisode: string = '';

  enabledButtonPrevious: boolean = false;
  enabledButtonNext: boolean = false;

  constructor(
    private router: Router,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.episodeService.findAll().subscribe((data: CollectionGenericDTO<EpisodesDTO>) => {
      this.info = data.info;
      this.results = data.results;

      this.enabledButton(this.info.prev, this.info.next);
    });
  }

  onSubmit(){
    let ids = this.searchInput;
    if (ids.length > 0) {
      let n = ids.split(',');
      if (n.length > 1) {
        this.episodeService.findByMultipleId(ids).subscribe((data: CollectionGenericDTO<EpisodesDTO>) => {
          this.results = data.results;

          this.enabledButton('', '');
        });
      } else {
        this.router.navigate([`pages/episode/single-episode/${n[0]}`]);
      }
    } else {
      let filter: EpisodeFilter = {
        page: null,
        name: this.searchName,
        episode: this.searchEpisode
      };

      this.episodeService.filter(filter).subscribe((data: CollectionGenericDTO<EpisodesDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }
  }

  resetForm(){
    this.searchInput = '';
    this.searchName = '';
    this.searchEpisode = '';

    this.enabledButtonPrevious = false;
    this.enabledButtonNext = false;

    this.loadPage();
  }

  onPrevious() {
      let filter: EpisodeFilter = {
        page: this.info.prev,
        name: this.searchName,
        episode: this.searchEpisode
      };

      this.episodeService.filter(filter).subscribe((data: CollectionGenericDTO<EpisodesDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }

    onNext() {
      let filter: EpisodeFilter = {
        page: this.info.next,
        name: this.searchName,
        episode: this.searchEpisode
      };

      this.episodeService.filter(filter).subscribe((data: CollectionGenericDTO<EpisodesDTO>) => {
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
