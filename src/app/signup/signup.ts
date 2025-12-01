import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  encapsulation: ViewEncapsulation.None
})
export class Signup {
  username: string = '';
  fullname: string = '';
  password: string = '';
  email: string = '';
  error?: string;

  constructor(private http: HttpClient) {}

  signup(): void {
    this.error = undefined;

    const body = {
      username: this.username,
      password: this.password,
      fullname: this.fullname,
      email: this.email
    };

    this.http.post<any>(
      'http://192.168.18.87:8066/api/Auth/register',
      body
    ).subscribe({
      next: (res) => {
        console.log('Sign up success:', res);
        alert("Đăng ký thành công!");
      },
      error: (err) => {
        console.error(err);
        this.error = "Đăng ký thất bại!";
      }
    });
  }
}
