import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, otherwise false
  }

  public loginWithUsernameAndPassword(username: string, password: String) {
    const url = environment.baseUrl + '/login/';
    const body = { username: username, password: password };
    this.loggedIn.next(true);
    return lastValueFrom(this.http.post(url, body));
  }

  async logout() {
    const url = `${this.apiUrl}/logout/`;
    try {
      await lastValueFrom(this.http.post(url, {}));
    } catch (e) {
      console.error('Logout failed', e);
    }
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  register(
    username: string,
    password: string,
    passwordConfirm: string,
    email: string
  ): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}register/`, {
      username,
      password,
      password_confirm: passwordConfirm,
      email,
    });
  }
}
