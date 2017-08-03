import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/book-list', pathMatch: 'full'},
  {path: 'book-list', component: BookListComponent},
  {path: 'book-edit/:id', component: BookEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
