import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, NgModelGroup, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
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
export class CategoryFormComponent implements OnInit, Validator { 
  
  currentCategory: Category = new Category(0,"",Language.English,Language.Hebrew,[]);


  @ViewChild('wordGroup') PairOfWordsGroup? : NgModelGroup;
  hebrewLettersPattern = '^[א-ת\s]+$';
  englishLettersPattern = '^[A-Za-z\s]+$';



  @Input()
  id? : string;

  constructor(private categoryService: CategoryService, private router: Router) { 

  }


      validate(control: AbstractControl): ValidationErrors | null {
        throw new Error('Method not implemented.');
    }
  

      validateWords(form: NgForm) {
        const wordsArray = this.currentCategory.PairOfWords;
          if (!wordsArray || wordsArray.length === 0) 
            { this.PairOfWordsGroup?.control.setErrors({ 'noWords': true });
          } else { 
              this.PairOfWordsGroup?.control.setErrors(null);
            }
      }

       atLeastOnePair(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
              const wordsArray = control.get('PairOfWordsGroup')?.value;
  
          if (!wordsArray || wordsArray.length === 0) {
              return { 'noWords': true };
          }
  
          for (const word of wordsArray) {
            if (word.originWord && word.targetWord) {
              return null; 
              }
          } 
  
      return { 'noWords': true }; 
    };
  }


 ngOnInit(): void {
    console.log("provided Id:", this.id,"")
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
    console.log("current category",this.currentCategory)
    console.log("cateName:",this.currentCategory.cateName)
    this.router.navigate(['']);
  }

  addPairOfWords() {
    this.currentCategory.PairOfWords.push({originWord:'',targetWord:''});
  }

  removePairOfWords(index : number) {
    this.currentCategory.PairOfWords.splice(index, 1);
    this.PairOfWordsGroup?.control.markAsDirty();
  }
 } 

