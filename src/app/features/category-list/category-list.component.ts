import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
        this.filteredCategories = [...this.categories];
      },
      (error) => {
        this.toastr.error('Failed to load categories');
        console.error(error);
      }
    );
  }

  filterCategories(): void {
    if (!this.searchTerm) {
      this.filteredCategories = [...this.categories];
      return;
    }

    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      // Note: You'll need to add a delete endpoint in your API
      // this.categoryService.deleteCategory(id).subscribe(
      //   (response: any) => {
      //     this.toastr.success(response.message);
      //     this.loadCategories();
      //   },
      //   (error) => {
      //     this.toastr.error('Failed to delete category');
      //     console.error(error);
      //   }
      // );
      this.toastr.warning('Delete functionality not implemented in API');
    }
  }
}
