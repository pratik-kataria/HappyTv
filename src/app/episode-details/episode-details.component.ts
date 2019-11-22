import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../models/Episode';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent implements OnInit {
  
  @Input()
  selectedEpisode:Episode;

  genreString:string;
  constructor() { }

  ngOnInit() {
    console.log(this.selectedEpisode);
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
}
