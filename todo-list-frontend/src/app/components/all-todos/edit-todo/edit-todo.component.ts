import { TodoService } from './../../../services/todo.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent {
  constructor(private todoService: TodoService) {}

  @Input() todo: any;
  @Output() close = new EventEmitter<void>();

  title: string = '';
  description: string = '';


  ngOnInit() {
    if (this.todo) {
      this.title = this.todo.title;
      this.description = this.todo.description;
    }
  }

  closeEditCard() {
    this.todoService.setEditCard(false);
  }

  editTodo() {
    const updatedTodo = {
      ...this.todo,
      title: this.title,
      description: this.description,
    };
    this.todoService.updateTodo(updatedTodo).subscribe(
      (response) => {
        this.todoService.setEditCard(false);
      },
      (error) => {
        console.error('Error updating todo:', error);
      }
    );
  }


}
