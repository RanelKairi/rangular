import { TranslatedWord } from "../Data/TranslatedWord";
import { Language } from "../Language-enum";

export class Category {
  lastUpdateDate:Date = new Date();
  PairOfWords: TranslatedWord[] = [];
  
  constructor (
    public id: number,
    public cateName : string,
    public originLanguage: Language,
    public targetLanguage: Language,
    words: TranslatedWord[] = []
    
    ){
        this.PairOfWords = words;
    }

    fullCate() : string {
        return this.cateName;

    }

    public NumOfWords ( category : Category): number {
        return category.PairOfWords.length;
    }


}




