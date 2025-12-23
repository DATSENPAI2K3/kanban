import { Component } from '@angular/core';
import { KanbanBoard } from '../kanban-board/kanban-board';
import { Router } from '@angular/router';
import { label } from '@primeuix/themes/lara/metergroup';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {
  constructor(private router: Router){}
  a = [
    {
      url: 'overview',
      label: 'Overview'
    },
  ]
  kanban(){
    this.router.navigate(['/kanbanboard']);
  }
  overview(){
    this.router.navigate(['/overview']);
  }
}
