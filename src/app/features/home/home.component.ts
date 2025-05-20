import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faChartBar,
  faCog,
  faEdit,
  faList,
  faPlus,
  faSearch,
  faTrash,
  faUsers,
  faUtensils
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  // Icons
  faUtensils = faUtensils;
  faList = faList;
  faUsers = faUsers;
  faChartBar = faChartBar;
  faCog = faCog;
  faBell = faBell;
  faSearch = faSearch;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  // Sample data
  recentProducts = [
    { id: 1, name: 'Cappuccino', category: 'Hot Drinks', price: 4.50, stock: 24 },
    { id: 2, name: 'Croissant', category: 'Pastries', price: 3.20, stock: 12 },
    { id: 3, name: 'Iced Latte', category: 'Cold Drinks', price: 4.80, stock: 18 },
    { id: 4, name: 'Chocolate Cake', category: 'Desserts', price: 5.50, stock: 8 }
  ];

  categories = [
    { id: 1, name: 'Hot Drinks', productCount: 8 },
    { id: 2, name: 'Cold Drinks', productCount: 6 },
    { id: 3, name: 'Pastries', productCount: 12 },
    { id: 4, name: 'Desserts', productCount: 7 }
  ];

  stats = [
    { title: 'Total Products', value: 45, icon: faUtensils },
    { title: 'Categories', value: 8, icon: faList },
    { title: 'Low Stock Items', value: 5, icon: faBell },
    { title: 'Monthly Sales', value: '$12,845', icon: faChartBar }
  ];
}
