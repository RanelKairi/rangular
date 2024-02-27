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
  allCategories : Category[]=[];
  displayedColumns = ['fullCate','numofwords','lastedit','actions'] // אחרי ה html
  dataSource = new MatTableDataSource<Category>(this.allCategories);
  sortedData: Category[] = [];
  sort!: MatSort | null;

  

  getDateAsString(category: Category) : Date {
    return category.lastUpdateDate;
  }

  showlog() : void {
    console.log("allCategories",this.allCategories,JSON.stringify(this.allCategories))
    let pik = JSON.stringify(this.allCategories)
    let pik2 = JSON.stringify(Array.from(this.allCategories.values()))
    console.log("hereispik",pik,"here is pik 2",pik2)
   // let piki = localStorage.getItem()
      
  }

  public NumOfWords ( category : Category): number {
    return category.PairOfWords.length;
}

  constructor(private categoryService : CategoryService, private dialogService : MatDialog){
    this.sortedData = this.allCategories.slice();

  }
  
  
  ngOnInit(): void {
    this.allCategories = this.categoryService.list();
    this.dataSource = new MatTableDataSource<Category>(this.allCategories);
    this.dataSource.sort = this.sort;
    console.log("allCategories",this.allCategories,"this.dataSource")
    
    
    
  }


  deleteCategory(id:number, fullCate : string){
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent,{data : fullCate,}) 
 
    dialogRef.afterClosed().subscribe(deletionResult =>{
      if(deletionResult){
        this.categoryService.delete(id);
        this.allCategories = this.categoryService.list();
        console.log('all Categories',this.allCategories)
      }
    })
 
  }



}
