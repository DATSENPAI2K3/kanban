import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

// interface LoginResponse {
//   token: string;
//   username: string;
//   userId: number;
// }

@Component({
  selector: 'login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  encapsulation: ViewEncapsulation.None
})
export class Login {

  username: string = '';
  password: string = '';
  error?: string;

 constructor(private http: HttpClient, private router: Router) {
  localStorage.setItem("token","");
 }

 warningun = "";
 warningpw = "";
  login(): void {
    this.error = undefined;

    if(!this.username || !this.password){

      if(!this.password){
        this.warningpw = "Mật khẩu không được để trống!";
      }else this.warningpw = "";

      if(!this.username){
        this.warningun = "Tên đăng nhập không được để trống!";
      }else this.warningun = "";

      return;
    }

    const body = {
      username: this.username, //key : value
      password: this.password
    };

    if(this.username )
    this.http.post<any>(
      'http://192.168.18.87:8066/api/Auth/login',
      body
    ).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res.data.token);
        console.log(localStorage.getItem("token"));
        localStorage.setItem("name", this.username);
        this.router.navigate(['/scrum']);
      },
      error: (err) => {
        console.error(err);
        this.warningun = "";
        this.warningpw = "Tên đăng nhập hoặc mật khẩu không chính xác!";
      }
    });
  }
}
