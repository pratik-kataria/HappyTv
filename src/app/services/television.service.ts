import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Episode } from '../models/Episode';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class TelevisionService{
    constructor(private http:HttpClient){

    }
    private baseUrl:string = "https://api.tvmaze.com";

    getAllEpisodes():Observable<any>
    {
        return this.http.get(this.baseUrl+"/schedule");
    }

}