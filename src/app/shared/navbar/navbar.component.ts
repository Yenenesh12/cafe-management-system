import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  // imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false;
  isSidebarActive = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

//   toggleSidebar() {
//   this.isSidebarOpen = !this.isSidebarOpen;
// }

isMobile() {
  return window.innerWidth <= 768;
}

// imagePath(): string {
//   const imgUrl = '/src/assets/img/logo.png';
//   return imgUrl;
// }


toggleSidebar() {
  this.isSidebarActive = !this.isSidebarActive;
}

@HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (window.innerWidth <= 768) { // Only for mobile
      const target = event.target as HTMLElement;
      const isMenuButton = target.closest('.menu-toggle');
      const isSidebar = target.closest('.sidebar');

      if (!isMenuButton && !isSidebar) {
        this.isSidebarActive = false;
      }
    }
}
}
