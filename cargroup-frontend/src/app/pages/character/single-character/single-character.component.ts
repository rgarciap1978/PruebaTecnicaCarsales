import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersDTO } from 'src/app/dto/charactersDTO';
import { GenericDTO } from 'src/app/dto/genericDTO';
import { CharacterService } from 'src/app/service/character.service';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.css']
})
export class SingleCharacterComponent {

  id: number;
  response: GenericDTO<CharactersDTO> = {
    Success: false,
    ErrorMessage: '',
    results: {
      id: 0,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {name: '', url: ''},
      location: {name: '', url: ''},
      image: '',
      episode: [],
      url: '',
      created: ''
    }
  }

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });

    this.characterService.findById(this.id).subscribe(data => {
      this.response = data
    });
  }

  goBack() {
    this.location.back();
  }
}
