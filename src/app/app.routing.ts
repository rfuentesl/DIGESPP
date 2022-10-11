import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

const appRoutes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(appRoutes);