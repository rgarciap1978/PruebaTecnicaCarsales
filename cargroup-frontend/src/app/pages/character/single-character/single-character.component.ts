import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/model/character';
import { CharacterService } from 'src/app/service/character.service';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.css']
})
export class SingleCharacterComponent {

  id: number;
  character: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    })
    this.characterService.getCharacterById(this.id).subscribe(data => {
      this.character = data;
    });
  }

  goBack() {
    this.location.back();
  }
}
