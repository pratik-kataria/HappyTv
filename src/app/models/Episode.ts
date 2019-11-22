import { Show } from './Show';
import { Time } from '@angular/common';

export class Episode {
    id: string;
    url: string;
    name: string;
    season: string;
    number: string;
    airdate: Date;              // can be date or string
    airtime: Time;            // time or string
    airstamp: string;
    runtime: string;
    image: string;
    summary: string;
    show: Show;
}