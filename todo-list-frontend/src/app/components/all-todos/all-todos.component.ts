import { TodoService } from './../../services/todo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule, NewTodoComponent, EditTodoComponent],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  todos: any = [];
  error = '';
  openNewCard: boolean = false;
  editOpen: boolean = false;
  currentTodo: any = null;
  checked: boolean = false;
  title: string = '';
  description: string = '';
  @Input() todo: any;

  constructor(private http: HttpClient, private todoService: TodoService) {}

  async ngOnInit() {
    this.todoService.openNewCard$.subscribe((value) => {
      this.openNewCard = value;
      if (!value) {
        this.loadTodos();
      }
    });
    this.todoService.editOpen$.subscribe((value) => {
      this.editOpen = value;
      if (!value) {
        this.loadTodos();
      }
    });
    this.loadTodos();
  }

  async loadTodos() {
    try {
      this.todos = await this.fetchTodos();
      console.log(this.todos);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  fetchTodos() {
    const url = environment.baseUrl + 'todos/';

    return lastValueFrom(this.http.get(url));
  }

  openCard() {
    this.todoService.setOpenNewCard(!this.openNewCard);
  }

  editCard(todo: any) {
    this.currentTodo = todo;
    this.todoService.setEditCard(!this.editOpen);
  }

  closeEditCard() {
    this.editOpen = false;
    this.loadTodos(); // Reload todos after editing
  }

  completeTask(todo: any) {
    this.currentTodo = todo;
    this.completeTodo(this.currentTodo);
  }

  completeTodo(completeTodo: any) {
    const updatedTodo = {
      ...this.todo,
      title: completeTodo.title,
      description: completeTodo.description,
      checked: true,
      author: completeTodo.author,
      date: completeTodo.date,
      id: completeTodo.id,
    };
    this.todoService.updateTodo(updatedTodo).subscribe(
      (response) => {
        this.loadTodos();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  uncompleteTask(completeTodo: any) {
    const updatedTodo = {
      ...this.todo,
      title: completeTodo.title,
      description: completeTodo.description,
      checked: false,
      author: completeTodo.author,
      date: completeTodo.date,
      id: completeTodo.id,
    };
    this.todoService.updateTodo(updatedTodo).subscribe(
      (response) => {
        this.loadTodos();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }

  deleteCard(todo: any) {
    this.currentTodo = todo;
    this.todoService.deleteTodo(this.currentTodo.id).subscribe(
      (response) => {
        this.loadTodos();
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }
}
