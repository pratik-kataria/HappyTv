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
  constructor() { }

  ngOnInit() {
    console.log(this.selectedEpisode);
  }

}
