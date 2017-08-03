import { Component, OnInit } from '@angular/core';
import { IBook } from '../book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books: Array<IBook>;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(id: number): void {
    this.booksService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
}
