import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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

 constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.error = undefined;

    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'http://192.168.18.87:8066/api/Auth/login',
      body
    ).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        alert("Đăng nhập thành công!");
        localStorage.setItem('token', res.token);
        localStorage.setItem("name", this.username);
        this.router.navigate(['/kanbanboard']);
      },
      error: (err) => {
        console.error(err);
        this.error = "Sai tài khoản hoặc mật khẩu!";
      }
    });
  }
}
