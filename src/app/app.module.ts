import { routing } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from "./app.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}