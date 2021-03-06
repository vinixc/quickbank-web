import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/transferencias', title: 'Transferencias',  icon:'ni-bullet-list-67 text-success', class: '' },
    { path: '/user-profile', title: 'Dados da Conta',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/invest', title: 'QuickInvest',  icon:'ni-money-coins text-primary', class: '' },
    { path: '/carteira', title: 'Carteira',  icon:'ni-credit-card text-yellow', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(){
    this.userService.logout();
  }
}
