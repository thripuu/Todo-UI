import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../model/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  @Input() todo: Todo;
  @Output() todoUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() todoDeleted: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {
  }

  ngOnInit() {
  }

  updateTodo() {
    this.todoUpdated.emit(this.todo);
  }

  deleteTodo() {
    this.todoDeleted.emit(this.todo);
  }

}
