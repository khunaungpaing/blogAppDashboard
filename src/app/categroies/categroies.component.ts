import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-categroies',
  templateUrl: './categroies.component.html',
  styleUrls: ['./categroies.component.css']
})
export class CategroiesComponent implements OnInit {

  categoryForm!: FormGroup;
  categoryArray!: Array<any>;
  formStatus: string = 'Add';
  currentItem?: any;

  constructor(private fb: FormBuilder, private categoryService: CategoriesService) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    let data: Category = {
      category: this.categoryForm.value.category
    }
    if (this.formStatus === 'Add') {
      this.categoryService.saveData(data);
    } else {
      this.categoryService.update(this.currentItem.id, data);
    }
    this.categoryForm.reset();
    this.formStatus = 'Add';
  }

  ngOnInit(): void {
    console.log('hello from on init')
    this.categoryService.loadData().subscribe(val => {
      this.categoryArray = val;
    });
  }

  onEdit(c: any) {
    this.categoryForm.setValue({
      category: c.data.category
    })
    this.formStatus = 'Edit';
    this.currentItem = c;
  }

  onDelete(id: string) {
    this.categoryService.delete(id);
  }
}
