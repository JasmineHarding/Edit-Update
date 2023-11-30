import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  Books: any = [];

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.crudService.GetBooks().subscribe((res: any) => {
      console.log(res);
      this.Books = res;
    });
  }

  onEdit(id: any): void {
    this.router.navigate(['/edit-book', id]);
  }

  onDelete(id: any): void {
    this.crudService.DeleteBook(id).subscribe((res: any) => {
      console.log('Book deleted successfully:', res);
      this.loadBooks();
    });
  }
}
