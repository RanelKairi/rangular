import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { CategoryFormComponent } from './category-form/category-form.component';

export const routes: Routes = [
    {path:"",component:TableComponent},
    {path:"newcategory",component:CategoryFormComponent},
    {path:"editcategory/:id",component:CategoryFormComponent},
    
];
