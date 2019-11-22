import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpisodeScheduleComponent } from './episode-schedule/episode-schedule.component';



const routes: Routes = [
  {path:'' , redirectTo:'/shows' , pathMatch:'full'},
  {path:'shows' , component: EpisodeScheduleComponent},
  {path:'**' , redirectTo:'shows'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
