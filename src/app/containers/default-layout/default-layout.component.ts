import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth/auth.service';
import { ProfileResolver } from '@app/resolvers/profile.resolver';



//import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  // OCULTARLO CUANDO SEA DINÁMICO
  //public navItems = navItems;

  // MOSTRARLO PARA QUE PUEDA REALIZAR PRUEBAS
  public navItems;

  perfil: any;
  username: any;
  usuario: any;
  modulos: any;
  isLoadingModulos = false;
  modulo;
  urlModulo: any;
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private profileResolver: ProfileResolver,
  

  ) { }

  ngOnInit() {
    this.perfil = this.profileResolver.getProfile();
    this.username = this.perfil.primer_nombre + ' ' + this.perfil.primer_apellido; 
    var tipo_usuario: number = this.perfil.tipo_usuario;

    // ESTO LO OCULTO PARA MIENTRAS PARA QUE PUEDA TENER TODAS LAS OPCIONES DEL MENÚ
    this.mostrarMenu(tipo_usuario);

    //console.log(' perfil: ', this.perfil);
    // ESTO SE TIENE QUE OCULTAR PARA QUE FUNCIONE DINAMICO EL MENU
    //this.navItems = this.navigationPermissions(navItems);

  }

  mostrarMenu(id_modulo) {
    this.authService.getOpciones({ 'id_modulo': id_modulo })
      .subscribe(response => {
        this.modulo = response;
        this.navItems = this.navigationPermissions(response);
        //console.log(' navitems this.modulo : ', response);
      });
  }

  navigationPermissions(navigationItems): any {
    const navWithPermissions = [];
    navigationItems.forEach(item => {
      const navItem = { ...item };
      if (navItem.permission) {
            navWithPermissions.push(navItem);
            return true;
          }
        });
    return navWithPermissions;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
