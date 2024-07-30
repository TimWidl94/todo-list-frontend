import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  email: string = '';
  regestrationComplete: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  registrate() {
    this.authService
      .register(this.username, this.password, this.passwordConfirm, this.email)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Hier können Sie den Benutzer weiterleiten oder eine Erfolgsnachricht anzeigen
          this.regestrationComplete = true;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        (error) => {
          console.error('Registration failed', error);
          // Hier können Sie eine Fehlermeldung anzeigen
        }
      );
  }
}
