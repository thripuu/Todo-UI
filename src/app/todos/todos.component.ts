import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './model/todo';
import {TodoList} from './model/todolist';
import {RestService} from '../util/rest.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoList: TodoList[] = [];
  todos: Todo[] = [];
  selectedTodoList: TodoList;
  searchText: string;
  
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getAllTodos();
    this.getAllTodoLists();
    this.getDefaultTodoLists();
  }

  public getAllTodoLists() {
    this.restService.getAllTodoLists().subscribe(
      res => {
        this.todoList = res;
      },
      err => {
        alert("Error Ocuured: Not able to access getAllTodoLists()")
      }
    );
  }

public getDefaultTodoLists() {
    this.restService.getDefaultTodoLists().subscribe(
      res => {
        this.selectedTodoList = res;
      },
      err => {
        alert("Error Ocuured: Not able to access getDefaultTodoLists()")
      }
    );
  }

  public getAllTodos() {
  this.restService.getAllNTodos().subscribe(
    res => {
      this.todos = res;
    }, err => {
      alert("Error Occured: Not able to access getAllTodos()")
    }
    );
  } 

  createTodoList() {
    let newTodoList:TodoList = {
      title:'New todoList',
      id: null,
      nbOfTodos: 0
    };

    this.restService.postTodoList(newTodoList).subscribe(
      res => {
        newTodoList.id = res.id;
        this.todoList.push(newTodoList);
      },
      err => {alert("An error has occurred while saving the TodoList");}
    );

  }

  updateTodoList(updatedTodoList: TodoList) {
    this.restService.postTodoList(updatedTodoList).subscribe(
      res => {

      },
      err => {alert("Error Occured: not able to access updateTodoList");}
    );
  }

  deleteTodoList(todoList: TodoList) {
    if(confirm("Are you sure you want to delete TodoList?")){
      this.restService.deleteTodoList(todoList.id).subscribe(
        res => {
          let indexOfTodoList = this.todoList.indexOf(todoList);
          this.todoList.splice(indexOfTodoList,1);
        },
        err => {
          alert("Error Occured in deleteTodoList()");
        }
      );
    }
  }

  deleteTodo(todo: Todo){
    if(confirm("Are you sure you want to delete this Todo?")){
      this.restService.deleteTodo(todo.id).subscribe(
        res =>{
          let indexOfTodo = this.todos.indexOf(todo);
          this.todos.splice(indexOfTodo, 1);
        },
        err=>{alert("An error has occurred deleting the Todo");}
      );
    }
  }

  createTodo(todoListId: string) {
    let newTodo:Todo = {
      id: null,
      title: "New Todo",
      text: "Write some text in here",
      lastModifiedOn: null,
      todoListId: todoListId
    };

    this.restService.saveTodo(newTodo).subscribe(
      res => {
        newTodo.id = res.id;
        this.todos.push(newTodo);
      },
      err => {alert("An error occurred while saving the Todo");}
    );
  }

  selectTodoList(todoList: TodoList) {
  
    this.selectedTodoList = todoList;
    this.restService.getTodosByTodoList(todoList.id).subscribe(
      res=> {
        this.todos = res;
      },
      err =>{alert("An error has occurred while downloading the Todos;")}
    );
  }

  updateTodo(updatedTodo: Todo) {
    this.restService.saveTodo(updatedTodo).subscribe(
      res => {
      },
      err => {alert("An error occurred while saving the Todo");}
    );
  }

  selectAllTodos() {
    //this.selectedTodoList = null;
    this.getAllTodos();
  }

}
