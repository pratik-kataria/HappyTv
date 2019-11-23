import { Component, OnInit, Input, Output } from '@angular/core';
import { Episode } from '../models/Episode';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {
  
  @Input()
  selectedEpisode:Episode;

  @Output()
  backEvent:EventEmitter<Boolean> = new EventEmitter<Boolean>(); 
  genreString:string;
  constructor() { }

  ngOnInit() {
    console.log(this.selectedEpisode);
    this.generateGenreString();
    console.log("inside detailed component");
    console.log("airstamp: "+this.selectedEpisode.airstamp);
    // getting the indian time for the show...
    let date:Date = new Date(this.selectedEpisode.airstamp);
    console.log("airstamp date:"+date);
    let today:Date = new Date();
    console.log("today: "+today);
    console.log("today utc: "+today.toUTCString());
    let addedMilis = Date.parse(today.toUTCString()) + (-5*60*1000);
    let addedTime:Date = new Date(addedMilis);
    console.log(addedTime);
    if(Date.parse(addedTime.toUTCString()) > Date.parse(today.toUTCString()))
    {
      console.log("greater");
    }
    else if(Date.parse(addedTime.toUTCString()) < Date.parse(today.toUTCString()))
    {
      console.log("Smaller");
    }
    else{
      console.log("equal");
    }
    // Date.parse;

    // take a date..

  }

  generateGenreString()
  {
    this.genreString = "";
    if(this.selectedEpisode)
    {
      let len = this.selectedEpisode.show.genres.length;
      if(len > 0)
      {
        this.genreString += this.selectedEpisode.show.genres[0];
      }
      for(let i = 1 ; i<len - 1 ; i++)
      {
        this.genreString += ", "+ this.selectedEpisode.show.genres[i];
      }
      this.genreString += " & ";
      this.genreString += this.selectedEpisode.show.genres[len-1];
    }
  }

  
  goBack()
  {
    this.backEvent.emit(true);
  }

  
}
