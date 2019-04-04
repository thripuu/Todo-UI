import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodosComponent } from './todos/todos.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Router, RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import { TodoComponent } from './todos/todo/todo.component';
import { TodoSearchPipe } from './util/todo-search';


const appRoutes: Routes = [
{
  path: 'todos',
  component: TodosComponent
},
{
  path: '',
  component: TodosComponent,
  pathMatch: 'full'
},
{
  path: '**',
  component: NotFoundComponent
}

];
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    TodosComponent,
    NavigationComponent,
    TodoComponent,
    TodoSearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
