import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public loginWithUsernameAndPassword(username: string, password: String) {
    const url = environment.baseUrl + '/login/';
    const body = { "username": username, "password": password };
    this.loggedIn.next(true);
    return lastValueFrom(this.http.post(url, body));
  }

  async logout() {
    const url = `${this.apiUrl}/logout/`;
    try {
      // Optional: Anfrage an den Server senden, um das Token auf Serverseite zu invalidieren
      await lastValueFrom(this.http.post(url, {}));
    } catch (e) {
      console.error('Logout failed', e);
    }
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
