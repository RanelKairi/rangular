import { Component,OnInit } from '@angular/core';
import { CategoryService } from '../services/categoryService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../shared/model/category-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-game-mode',
  standalone: true,
  imports: [
    CommonModule,RouterModule,
    CommonModule,       
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,MatMenu
  ],
  templateUrl: './game-mode.component.html',
  styleUrl: './game-mode.component.css'
})

export class GameModeComponent implements OnInit {
[x: string]: any;
  allCategories : Category[]=[];
  

  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }
}

//getCategoryDataByIndex(): void {}
  //this.allCategories = this.categoryService.list();
    //this.dataSource = new MatTableDataSource<Category>(this.allCategories);
    //console.log("allCategories",this.allCategories,"this.dataSource",this.dataSource)

//}
//getOptions(): any[] {
//  const options = JSON.parse(localStorage.getItem('options') || '[]');
  //return options;
//}


//function getCategoryDataByIndex() {
  //throw new Error('Function not implemented.');
//}

function getOptions() {
  throw new Error('Function not implemented.');
}

