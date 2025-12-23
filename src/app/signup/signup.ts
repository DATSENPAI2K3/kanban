import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';

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
  checkpassword: string ='';
  email: string = '';
  error?: string;
  warning = "";
  warningemail = "";
  warningusername = "";
  warningfullname = "";
  warningpassword = "";
  warningcheckpassword = "";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  signup(): void {
    this.error = undefined;
    if(this.email.length <= 10 || this.email !== "" && this.email.slice(this.email.length - 10, this.email.length) !== "@gmail.com") this.warningemail = "!Email chưa đúng định dạng";
    else if(!this.email) this.warningemail = "!Nhập email";
    else this.warningemail = "";
    if(!this.username) this.warningusername = "!Nhập tên đăng nhập";
    else this.warningusername = "";
    if(!this.fullname) this.warningfullname = "!Nhập họ và tên của bạn";
    else this.warningfullname = "";
    if(!this.password) this.warningpassword = "!Nhập mật khẩu";
    else this.warningpassword = "";
    if(!this.checkpassword) this.warningcheckpassword = "!Xác nhận mật khẩu của bạn";
    else this.warningcheckpassword = "";
    if(this.checkpassword !== this.password){
      this.warning = "Repassword không hợp lệ";
      return;
    }else this.warning = "";
    const body = {
      username: this.username,
      password: this.password,
      fullname: this.fullname,
      checkpassword: this.checkpassword,
      email: this.email
    };

    const bodylg = {
      username: this.username,
      password: this.password
    }
    this.http.post<any>(
      'http://192.168.18.87:8066/api/Auth/register',
      body
    ).subscribe({
      next: (res) => {
        console.log('Sign up success:', res);
        alert("Đăng ký thành công!");
        this.http.post<any>(
          'http://192.168.18.87:8066/api/Auth/login',
          bodylg
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
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.error = "Đăng ký thất bại!";
        return;
      }
    });
  }
}
