import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../todos/model/todo";

@Pipe({
  name: 'todoSearch'
})
export class TodoSearchPipe implements PipeTransform {

  transform(todos: Todo[], text: string): Todo[] {
    if(text == null || text === ""){
      return todos;
    }
    return todos.filter(t => t.title.includes(text) || t.text.includes(text));
  }

}