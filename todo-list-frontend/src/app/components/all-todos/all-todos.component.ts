import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NewTodoComponent } from './new-todo/new-todo.component';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule, NewTodoComponent],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  error = '';
  openNewCard: boolean = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  loadTodos() {
    const url = environment.baseUrl + 'todos/';

    return lastValueFrom(this.http.get(url));
  }

  openCard() {
    this.openNewCard = !this.openNewCard;
  }
}
