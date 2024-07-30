import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.baseUrl + 'todos/';

  constructor(private http: HttpClient) { }

  createTodo(todo: { title: string; description: string; }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
    return this.http.post<any>(this.apiUrl, todo, { headers });
  }
}
