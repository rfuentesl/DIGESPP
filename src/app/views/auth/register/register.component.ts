
import { Component, EventEmitter, Input, OnInit, Output  } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  //styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  email: string| undefined ;;
  password: string | undefined ;; 
  confirmPassword: string | undefined ;;

  constructor() {}

  register() {
    console.log(this.email);
    console.log(this.password);
  }
}