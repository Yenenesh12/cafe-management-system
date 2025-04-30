import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = +params['id'];
        this.loadCategory(this.categoryId);
      }
    });
  }

  loadCategory(id: number): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        const category = response.find((c: any) => c.id === id);
        if (category) {
          this.categoryForm.patchValue({
            name: category.name
          });
        }
      },
      (error) => {
        this.toastr.error('Failed to load category');
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const categoryData = this.categoryForm.value;

    if (this.isEditMode && this.categoryId) {
      categoryData.id = this.categoryId;
      this.categoryService.updateCategory(categoryData).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.router.navigate(['/categories']);
        },
        (error) => {
          this.toastr.error('Failed to update category');
          console.error(error);
        }
      );
    } else {
      this.categoryService.addNewCategory(categoryData).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.router.navigate(['/categories']);
        },
        (error) => {
          this.toastr.error('Failed to add category');
          console.error(error);
        }
      );
    }
  }
}
