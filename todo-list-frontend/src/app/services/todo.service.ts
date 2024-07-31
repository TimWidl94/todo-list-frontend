import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

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

  updateTodo(todo: any): Observable<any> {
    return this.http.put(this.apiUrl + todo.id + '/', todo);
  }

  completeTask(todo: any): Observable<any>{
    return this.http.put(this.apiUrl + todo.id + '/', todo)
  }

  private openNewCardSubject = new BehaviorSubject<boolean>(false);
  openNewCard$ = this.openNewCardSubject.asObservable();

  setOpenNewCard(value: boolean) {
    this.openNewCardSubject.next(value);
  }

  setEditCard(value: boolean){
    this.editCardSubject.next(value);
  }

  private editCardSubject = new BehaviorSubject<boolean>(false);
  editOpen$ = this.editCardSubject.asObservable();
}
