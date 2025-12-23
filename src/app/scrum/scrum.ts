import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { KanbanBoard } from '../kanban-board/kanban-board';
@Component({
  selector: 'app-scrum',
  imports: [TabsModule,KanbanBoard],
  templateUrl: './scrum.html',
  styleUrl: './scrum.css',
})
export class Scrum {
  constructor(private router:Router){
    // if(!localStorage.getItem("token")){
    //   this.router.navigate(['/login']);
    // }
  }
  logout(){
    localStorage.setItem("token", "");
    console.log("abc" + localStorage.getItem("token"));
    this.router.navigate(['/login']);
  }
}
