import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu";
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-overview',
  imports: [MenuComponent],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  constructor(private router: Router){
    if(!localStorage.getItem("token")){
      this.router.navigate(['/login']);
    }
  }
}
