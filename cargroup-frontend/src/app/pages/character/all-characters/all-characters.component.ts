import { Component } from '@angular/core';
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

  constructor(private characterService: CharacterService) {}

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
    console.log('multipleSearch: ' + ids);

    this.characterService.getMultipleCharacters(ids).subscribe((data: Character[]) => {
      this.results = data;
    })

  }

  resetForm(){
    this.searchInput = '';
    this.loadPage();
  }
}
