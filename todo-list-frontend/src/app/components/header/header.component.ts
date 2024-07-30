import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AllTodosComponent } from '../all-todos/all-todos.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = false;
  sideBar: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
    await console.log('logged in status', this.isLoggedIn);
  }

  toggleSideBar() {
    if (!this.sideBar) {
      this.sideBar = true;
    } else this.sideBar = false;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');
    } catch (e) {
      alert('Logout fehlgeschlagen');
      console.error(e);
    }
  }
}
