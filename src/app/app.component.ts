import { Component, HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'happy-tv';


  time = new Date();
  constructor(location: PlatformLocation) {
    location.onPopState(() => {
       alert(window.location);
    }); }
  ngOnInit() {
      setInterval(() => {
        this.time = new Date();
      }, 1000);
  }

  
}
