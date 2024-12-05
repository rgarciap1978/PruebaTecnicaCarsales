import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllCharactersComponent } from './pages/character/all-characters/all-characters.component';
import { SingleCharacterComponent } from './pages/character/single-character/single-character.component';
import { AllEpisodesComponent } from './pages/episode/all-episodes/all-episodes.component';
import { AllLocationsComponent } from './pages/location/all-locations/all-locations.component';
import { SingleEpisodeComponent } from './pages/episode/single-episode/single-episode.component';
import { SingleLocationComponent } from './pages/location/single-location/single-location.component';

@NgModule({
  declarations: [
    AppComponent,
    AllCharactersComponent,
    SingleCharacterComponent,
    AllEpisodesComponent,
    AllLocationsComponent,
    SingleEpisodeComponent,
    SingleLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
