import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../shared/model/category-model';
import { Language } from '../shared/Language-enum';
import { TranslatedWord } from '../shared/Data/TranslatedWord';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe} from '@angular/common';
import { MatSortModule , MatSort} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CategoryService } from '../services/categoryService';
import { MatDialog} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule,MatIcon,DatePipe,MatSortModule,MatTableModule,CommonModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  getDateAsString() : string {
    const today = new Date();
    return today.toLocaleDateString();
  }
  public NumOfWords ( category : Category): number {
    return category.PairOfWords.length;
}

  constructor(private categoryService : CategoryService, private dialogService : MatDialog){}
  ngOnInit(): void {
    this.allCategories = this.categoryService.list();
  }

  allCategories : Category[]=[];
  displayedColumns = ['fullCate','numofwords','lastedit','actions'] // אחרי ה html

  deleteCategory(id:number, fullCate : string){
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent,{data : fullCate,}) 
 
    dialogRef.afterClosed().subscribe(deletionResult =>{
      if(deletionResult){
        this.categoryService.delete(id);
        this.allCategories = this.categoryService.list();
      }
    })
 
  }



}
