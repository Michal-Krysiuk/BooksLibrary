import { Injectable } from '@angular/core';
import { IBook } from './book';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class BooksService {
  private books: Array<IBook>;
  private observable: Observable<Array<IBook>>;

  constructor(private http: Http) {
    this.observable = this.http.get('./assets/books.json')
      .map(res => res.json());

    this.observable.subscribe(books => {
      this.books = books;
    });
  }

  public getBooks(): Observable<Array<IBook>> {
    return this.books ? Observable.of(this.books) : this.observable;
  }

  public getBook(id: number): Observable<IBook> {
    return new Observable((observer: Observer<any>) => {
      this.getBooks().subscribe(books => {
        observer.next(books.find(book => book.id === id));
        observer.complete();
      });
    });
  }

  public updateBook(book: IBook): Observable<IBook> {
    const index = this.books.findIndex(b => b.id === book.id);
    this.books[index] = book;
    return Observable.of(book);
  }

  public deleteBook(id: number): Observable<Array<IBook>> {
    this.books = this.books.filter(book => book.id !== id);
    return Observable.of({});
  }
}
