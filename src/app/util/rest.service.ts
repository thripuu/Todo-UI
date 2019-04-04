import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoList} from "../todos/model/todolist";
import {Todo} from "../todos/model/todo";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private BASE_URL = window["cfgApiBaseUrl"] + "/api";
  public ALL_TODOLISTS_URL = `${this.BASE_URL}/todoLists/all`;
  private SAVE_UPDATE_TODOLIST = `${this.BASE_URL}/todoLists`;
  private DELETE_TODOLIST_URL = `${this.BASE_URL}/todoLists/`;
  private ALL_TODOS_URL = `${this.BASE_URL}/todos/all`;
  private TODOS_BY_TODOLIST_URL = `${this.BASE_URL}/todos/byTodoList/`;
  private SAVE_UPDATE_TODO_URL = `${this.BASE_URL}/todos`;
  private DELETE_TODO_URL = `${this.BASE_URL}/todos/`;
  private DEFAULT_TODOLIST_URL = `${this.BASE_URL}/todoLists/getDefaultTodoList`;

  constructor(private http: HttpClient) {

  }

  getAllTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(this.ALL_TODOLISTS_URL);
  }

  
  getDefaultTodoLists(): Observable<TodoList> {
    return this.http.get<TodoList>(this.DEFAULT_TODOLIST_URL);
  }

  postTodoList(todoList: TodoList): Observable<TodoList> {
    return this.http.post<TodoList>(this.SAVE_UPDATE_TODOLIST, todoList);
  }

  deleteTodoList(id: string): Observable<any> {
    return this.http.delete(this.DELETE_TODOLIST_URL + id);
  }

  getAllNTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ALL_TODOS_URL);
  }

  getTodosByTodoList(todoListId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.TODOS_BY_TODOLIST_URL + todoListId);
  }

  saveTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.SAVE_UPDATE_TODO_URL, todo);
  }

  deleteTodo(todoId:string):Observable<any>{
    return this.http.delete(this.DELETE_TODO_URL + todoId);
  }
}
