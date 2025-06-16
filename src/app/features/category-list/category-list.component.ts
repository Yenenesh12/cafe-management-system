import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  pagedCategories: any[] = [];
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5;  // Show 5 items per page
  totalPages: number = 0;

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
        this.updatePagination();
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
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;  // Reset to first page when filtering
    this.updatePagination();
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCategories.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedCategories = this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getDisplayEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredCategories.length);
  }

  // Existing methods remain unchanged
  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  addNewCategory(): void {
    this.router.navigate(['categories/add']);
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
