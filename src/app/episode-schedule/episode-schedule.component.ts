import { Component, OnInit } from '@angular/core';
import { TelevisionService } from '../services/television.service';
import { Episode } from '../models/Episode';
import { Time } from '@angular/common';
@Component({
  selector: 'app-episode-schedule',
  templateUrl: './episode-schedule.component.html',
  styleUrls: ['./episode-schedule.component.css']
})
export class EpisodeScheduleComponent implements OnInit {

  showList:boolean;
  episodeList:Episode[];
  selectedEpisode:Episode;
  categorizedEpisodes:Map<string , Episode[]> = new Map<string , Episode[]>();
  constructor(private tvService:TelevisionService) {
    
   }

  ngOnInit() {
    this.initialiseData();
  }
  
  initialiseData()
  {
    this.getAllEpisodes();
    this.showList = true;
  }
  selectEpisode(episode)
  {
    this.selectedEpisode = episode; 
    this.toggleView();
  }

  toggleView()
  {
    this.showList = !this.showList;
  }
  getAllEpisodes()
  {
    this.tvService.getAllEpisodes()
    .subscribe(
      (success)=>{
        console.log("Inside success");
        this.episodeList = success as Episode[];
        console.log(this.episodeList);
        this.categoriseEpisodes();
      },
      (error)=>{
        console.log("Inside error");
        console.log(error);
      },
      ()=>{
        console.log("Api call finished");
      }
    );
  }

  categoriseEpisodes()
  {
    this.categorizedEpisodes = new Map<string , Episode[]>();
    console.log(this.episodeList);
    for(let i = 0 ; i < this.episodeList.length ; i++)
    {
      for(let genre of this.episodeList[i].show.genres)
      {
        let episodes:Episode[] = this.categorizedEpisodes.get(genre);
        if(episodes == null)
        {
          episodes = [];
        }
        episodes.push(this.episodeList[i]);
        this.categorizedEpisodes.set(genre , episodes);
      }
    }

    console.log(this.categorizedEpisodes);
  }

}
