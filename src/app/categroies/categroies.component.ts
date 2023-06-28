import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../services/categories.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-categroies',
  templateUrl: './categroies.component.html',
  styleUrls: ['./categroies.component.css']
})
export class CategroiesComponent implements OnInit{

  categoryForm!: FormGroup;

  constructor(private fb:FormBuilder, private categoryService:CategoriesService) {

  }
  onSubmit() {
    let data:Category = {
      category: this.categoryForm.value.category
    }
    this.categoryService.saveData(data);
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: ['',Validators.required],
    });
  }
}
