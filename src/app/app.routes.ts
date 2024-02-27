import { Routes, Router } from '@angular/router';
import { TableComponent } from './table/table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { GameModeComponent } from './game-mode/game-mode.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path:"",component:TableComponent},
    {path:"newcategory",component:CategoryFormComponent},
    {path:"editcategory/:id",component:CategoryFormComponent},
    {path:"app-game-mode",component:GameModeComponent},
    {path:"app-game",component:GameComponent}
    
];
