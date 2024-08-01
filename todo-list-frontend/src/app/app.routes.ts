import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllTodosComponent } from './components/all-todos/all-todos.component';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: AllTodosComponent },
  { path: 'regestration', component: RegistrationComponent },
];
