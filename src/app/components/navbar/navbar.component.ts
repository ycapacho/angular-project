import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Mesas',
        icon: 'pi pi-user-edit',
        routerLink: '/stations'
      },
      {
          label: 'Partidos',
          icon: 'pi pi-sort-alpha-up',
          routerLink: '/parties'
      },
      {
        label: 'Candidatos',
        icon: 'pi pi-user',
        routerLink: '/candidates'
      },
      {
        label: 'Resultados',
        icon: 'pi pi-chart-bar',
        routerLink: '/reports'
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-user',
        routerLink: '/users'
      }
    ];
  }

  logout() {
    this.auth.logout();
  }

}
