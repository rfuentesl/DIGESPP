import { Component } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",

})
export class LoginComponent {
  email: string | undefined ;
  password: string | undefined;

  constructor() {}

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}