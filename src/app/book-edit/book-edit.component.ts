import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { IBook } from '../book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public book: IBook;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.booksService.getBook(+params['id']).subscribe(book => {
        this.book = book;
      });
    });
  }

  saveBook(book: IBook): void {
    this.booksService.updateBook(book).subscribe(() => {
      this.router.navigate(['/book-list']);
    });
  }
}
