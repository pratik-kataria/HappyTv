import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EpisodeScheduleComponent } from './episode-schedule/episode-schedule.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { HttpClientModule} from '@angular/common/http';
import { TelevisionService } from './services/television.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    EpisodeScheduleComponent,
    EpisodeDetailsComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TelevisionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
