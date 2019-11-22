import { Schedule } from './Schedule';
import { Rating } from './Rating';
import { Network } from './Network';
import { Image } from './Image';
import { PreviousEpisode } from './PreviousEpisode';
import { NextEpisode } from './NextEpisode';

export class Show {
    id: string;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: string;
    premiered: string; // can be date or string
    officialSite: string;
    schedule: Schedule;
    rating: Rating;
    weight: string;
    network: Network;
    webChannel: string;
    image: Image;
    summary: string;
    updated: string;
    previousepisode: PreviousEpisode;
    nextepisode: NextEpisode;
}
