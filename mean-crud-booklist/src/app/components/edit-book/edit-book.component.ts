import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: any = {}; // Initialize with an empty book object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Updated line
    this.crudService.GetBookById(id).subscribe((res: any) => {
      this.book = res;
    });
  }

  onSubmit(): void {
    this.crudService.EditBook(this.book._id, this.book).subscribe((res: any) => {
      console.log('Book updated successfully:', res);
      this.router.navigate(['/books-list']); // Navigate back to the book list after updating
    });
  }
  
}
