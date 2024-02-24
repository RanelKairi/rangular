import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../shared/model/category-model';
import { Language } from '../shared/Language-enum';
import { CategoryService } from '../services/categoryService';
import { TranslatedWord } from '../shared/Data/TranslatedWord';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,RouterModule,
    CommonModule,       
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
    
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit { 
  currentCategory: Category = new Category(0,"",Language.English,Language.Hebrew,[]);
  @ViewChild('wordGroup') wordGroup? : NgModelGroup;
  hebrewLettersPattern = '^[א-ת\s]+$';
  englishLettersPattern = '^[A-Za-z\s]+$';



  @Input()
  id? : string;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    console.log("provided Id:", this.id)
    if (this.id) {
      let categoryFromService = this.categoryService.get(parseInt(this.id));
      console.log('Category loaded:', this.currentCategory);

      if (categoryFromService) {
        this.currentCategory = categoryFromService;
        console.log('Category loaded:', this.currentCategory);
      }
    }
  }

  onSubmitRegistration() {
    console.log("Form submitted!");
    if (this.id) {
      this.categoryService.update(this.currentCategory);
    } else {
      this.categoryService.add(this.currentCategory)
    }
    console.log(this.currentCategory)
    this.router.navigate(['']);
  }

  addPairOfWords() {
    this.currentCategory.PairOfWords.push({originWord:'',targetWord:''});
  }

  removePairOfWords(index : number) {
    this.currentCategory.PairOfWords.splice(index, 1);
    this.wordGroup?.control.markAsDirty();
  }
 } 

