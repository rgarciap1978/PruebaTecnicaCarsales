import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCharactersComponent } from './pages/character/all-characters/all-characters.component';
import { SingleCharacterComponent } from './pages/character/single-character/single-character.component';
import { AllEpisodesComponent } from './pages/episode/all-episodes/all-episodes.component';
import { SingleEpisodeComponent } from './pages/episode/single-episode/single-episode.component';
import { AllLocationsComponent } from './pages/location/all-locations/all-locations.component';
import { SingleLocationComponent } from './pages/location/single-location/single-location.component';

const routes: Routes = [
  { path: 'pages/character/all-characters', component: AllCharactersComponent },
  { path: 'pages/character/single-character/:id', component: SingleCharacterComponent },
  { path: 'pages/episode/all-episodes', component: AllEpisodesComponent },
  { path: 'pages/episode/single-episode/:id', component: SingleEpisodeComponent },
  { path: 'pages/location/all-locations', component: AllLocationsComponent },
  { path: 'pages/location/single-location/:id', component: SingleLocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
