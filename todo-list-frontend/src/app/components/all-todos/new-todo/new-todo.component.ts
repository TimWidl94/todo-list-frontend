import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.scss',
})
export class NewTodoComponent {
  title: string = '';
  description: string = '';
  checked: boolean = false;


  constructor(private todoService: TodoService){}

  createNewTodo() {
    const newTodo = { title: this.title, description: this.description, checked: this.checked };
    this.todoService.createTodo(newTodo).subscribe(
      (response) => {
        console.log('Todo created successfully:', response);
        this.title = '';
        this.description = '';
        this.checked = false
        this.closeNewCard();
      },
      (error) => {
        console.error('Error creating todo:', error);
      }
    );
  }

  closeNewCard(){
    this.todoService.setOpenNewCard(false);
  }
}
