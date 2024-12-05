import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersDTO } from 'src/app/dto/charactersDTO';
import { Character } from 'src/app/model/character';
import { Paginator } from 'src/app/model/paginator';
import { CharacterService } from 'src/app/service/character.service';

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css']
})
export class AllCharactersComponent {

  info: Paginator;
  results: Character[] = [];

  searchInput: string = '';
  prevPage: string;
  nextPage: string;

  constructor(
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(){
    this.characterService.getCharacters().subscribe((data: CharactersDTO) => {
      this.info = data.info;
      this.results = data.results;
    });
  }

  multipleSearch(){

    let ids = this.searchInput;
    let n = ids.split(',');
    if (n.length > 1) {
      this.characterService.getMultipleCharacters(ids).subscribe((data: Character[]) => {
        this.results = data;
      });
    }else{
      this.router.navigate([`pages/character/single-character/${n[0]}`]);
    }

  }

  resetForm(){
    this.searchInput = '';
    this.loadPage();
  }
}
