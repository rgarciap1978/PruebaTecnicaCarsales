import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersDTO } from 'src/app/dto/charactersDTO';
import { CollectionGenericDTO } from 'src/app/dto/collectionGenericDTO';
import { characterFilter } from 'src/app/model/characterFilter';
import { Paginator } from 'src/app/model/paginator';
import { CharacterService } from 'src/app/service/character.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css']
})
export class AllCharactersComponent {

  info: Paginator;
  results: CharactersDTO[] = [];

  searchInput: string = '';
  searchName: string = '';
  searchStatus: string = '';
  searchSpecies: string = '';
  searchType: string = '';
  searchGender: string = '';

  enabledButtonPrevious: boolean = false;
  enabledButtonNext: boolean = false;

  constructor(
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.characterService.findAll().subscribe((data: CollectionGenericDTO<CharactersDTO>) => {
      this.info = data.info;
      this.results = data.results;

      this.enabledButton(this.info.prev, this.info.next);
    });
  }

  onSubmit(){
    let ids = this.searchInput;
    if(ids.length > 0) {
      let n = ids.split(',');
      if (n.length > 1) {
        this.characterService.findByMultipleId(ids).subscribe((data: CollectionGenericDTO<CharactersDTO>) => {
          this.results = data.results;

          this.enabledButton('', '');
        });
      } else {
        this.router.navigate([`pages/character/single-character/${n[0]}`]);
      }
    } else {
      let filter: characterFilter = {
        page: null,
        name: this.searchName,
        status: this.searchStatus,
        species: this.searchSpecies,
        type: this.searchType,
        gender: this.searchGender
      };

      this.characterService.filter(filter).subscribe((data: CollectionGenericDTO<CharactersDTO>) => {
        this.info = data.info;
        this.results = data.results;

        this.enabledButton(this.info.prev, this.info.next);
      });
    }
  }

  resetForm(){
    this.searchInput = '';
    this.searchInput = '';
    this.searchName = '';
    this.searchStatus = '';
    this.searchSpecies = '';
    this.searchType = '';
    this.searchGender = '';

    this.enabledButtonPrevious = false;
    this.enabledButtonNext = false;

    this.loadPage();
  }

  onPrevious() {
    let filter: characterFilter = {
      page: this.info.prev,
      name: this.searchName,
      status: this.searchStatus,
      species: this.searchSpecies,
      type: this.searchType,
      gender: this.searchGender
    };

    this.characterService.filter(filter).subscribe((data: CollectionGenericDTO<CharactersDTO>) => {
      this.info = data.info;
      this.results = data.results;

      this.enabledButton(this.info.prev, this.info.next);
    });
  }

  onNext() {
    let filter: characterFilter = {
      page: this.info.next,
      name: this.searchName,
      status: this.searchStatus,
      species: this.searchSpecies,
      type: this.searchType,
      gender: this.searchGender
    };

    this.characterService.filter(filter).subscribe((data: CollectionGenericDTO<CharactersDTO>) => {
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
