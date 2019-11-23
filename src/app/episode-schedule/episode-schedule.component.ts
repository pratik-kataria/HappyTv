import { Component, OnInit } from '@angular/core';
import { TelevisionService } from '../services/television.service';
import { Episode } from '../models/Episode';
import { Time, PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-episode-schedule',
  templateUrl: './episode-schedule.component.html',
  styleUrls: ['./episode-schedule.component.css']
})
export class EpisodeScheduleComponent implements OnInit {

  showList:boolean;
  episodeList:Episode[];
  filteredList:Episode[];
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
        this.filterEpisodesWithCurrentUSTime();
        console.log("filtered Ldist");
        console.log(this.filteredList);
        this.categoriseEpisodes(this.episodeList);
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

  categoriseEpisodes(episodesList:Episode[])
  {
    this.categorizedEpisodes = new Map<string , Episode[]>();
    for(let i = 0 ; i < episodesList.length ; i++)
    {
      if(episodesList[i].show.genres && episodesList[i].show.genres.length==0)
      {
        let episodes:Episode[] = this.categorizedEpisodes.get("Others");
        if(episodes == null)
        {
          episodes = [];
        }
        episodes.push(episodesList[i]);
        this.categorizedEpisodes.set("Others" , episodes);
        continue;
      }
      for(let genre of episodesList[i].show.genres)
      {
        let episodes:Episode[] = this.categorizedEpisodes.get(genre);
        if(episodes == null)
        {
          episodes = [];
        }
        episodes.push(episodesList[i]);
        this.categorizedEpisodes.set(genre , episodes);
      }
    }

    console.log(this.categorizedEpisodes);
  }


  filterEpisodesWithCurrentUSTime()
  {
    this.filteredList = [];
    
    for(let i = 0 ; i < this.episodeList.length ; i++)
    {
      // current time in GMT+5:30
      let currentTime:Date = new Date();
      // Episode start time in GMT+5:30 (i.e., US time converted to Indian time zone)
      let startTime:Date = new Date(this.episodeList[i].airstamp);
      // converting the startTime to UTC and generating the millisecs tnen adding runtime millisecs
      let totalMilisecAfterAddingRuntime = Date.parse(startTime.toUTCString()) + (this.episodeList[i].runtime * 60 * 1000);
      // converting the millisecs to GMT+5:30
      let endTime:Date = new Date(totalMilisecAfterAddingRuntime);

      let currentMilis = Date.parse(currentTime.toUTCString());
      let startMilis = Date.parse(startTime.toUTCString());
      let endMilis = Date.parse(endTime.toUTCString())
      if(currentMilis >= startMilis && currentMilis <= endMilis)
      {
        this.filteredList.push(this.episodeList[i]);
      }
    }
  }


  getEndTime(time:string , runtime:number)
  {
    // Episode start time in GMT+5:30 (i.e., US time converted to Indian time zone)
    let startTime:Date = new Date(time);
    // converting the startTime to UTC and generating the millisecs tnen adding runtime millisecs
    let totalMilisecAfterAddingRuntime = Date.parse(startTime.toUTCString()) + (runtime * 60 * 1000);
    // converting the millisecs to GMT+5:30
    let endTime:Date = new Date(totalMilisecAfterAddingRuntime);

    // let startMilis = Date.parse(startTime.toUTCString());
    return endTime.toUTCString();
  }


}



