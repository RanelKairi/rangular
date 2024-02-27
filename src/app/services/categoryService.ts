import { Category } from "../shared/model/category-model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CategoryService{
    private readonly NEXT_ID_KEY = "nextId"
    private readonly CATE_KEY = "categories"

    constructor(){}

    private setNextId(id : number){
        localStorage.setItem(this.NEXT_ID_KEY, id.toString());
    }

    private getNextID() : number {
        let nextIdString = localStorage.getItem(this.NEXT_ID_KEY)
        return nextIdString ? parseInt(nextIdString) : 0;
    }

    private setCategories(allCategories : Map<number, Category>) : void{
        localStorage.setItem(this.CATE_KEY,
            JSON.stringify(Array.from(allCategories.values())));
    }

    private getCategories() : Map<number , Category> {
        let categoriesString = localStorage.getItem(this.CATE_KEY);
        let idtoCategory = new Map <number, Category>();

        if(categoriesString) {
            JSON.parse(categoriesString).forEach((category : Category) => {
                Object.setPrototypeOf(category, Category.prototype)
                idtoCategory.set(category.id,category)
            })
        }

        return idtoCategory;
    }

    list() : Category[] {
        return Array.from(this.getCategories().values());
    }

    get(id : number) : Category {
        let categoriesData = this.getCategories();
        if(!categoriesData.has(id)){
        throw new Error("fail"+id)
    
        }
        return categoriesData.get(id)!;
    }

    add(newCategoryData:Category) {
        let nextId = this.getNextID();
            newCategoryData.id = nextId

        let categoriesData = this.getCategories()
            categoriesData.set(nextId, newCategoryData);
            this.setCategories(categoriesData);

            this.setNextId(++nextId)

    }

    update(existingCategory : Category) : void {
        let categoryData = this.getCategories()
        console.log("hhh",)
// לבדוק
         if(categoryData.has(existingCategory.id)){
            categoryData.set(existingCategory.id,existingCategory);
            this.setCategories(categoryData)
        }
         }

    delete(existingCategoryId : number) : void {
        let categoriesData = this.getCategories();
// להוסיף אולי IF
        categoriesData.delete(existingCategoryId);
        this.setCategories(categoriesData)
    }




}