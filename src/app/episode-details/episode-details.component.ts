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
    this.generateGenreString();
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

  getHttpsUrl(url:string)
  {
    return "https:"+url.substring(5);
  }
  
}
