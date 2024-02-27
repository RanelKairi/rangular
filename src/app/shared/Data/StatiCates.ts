import { Language } from "../Language-enum";
import { Category } from "../model/category-model";
import { TranslatedWord } from "./TranslatedWord";

export const word_Cate : Category[] = [
    new Category(0,'veichles',Language.English,Language.Hebrew, [
        new TranslatedWord('bus','אוטובוס'),
        new TranslatedWord('taxi','מונית')
        
      ]),

    new Category(1,'veggies',Language.English,Language.Hebrew, [
        new TranslatedWord('lettace','חסה'),
        new TranslatedWord('onion','בצל'),
        new TranslatedWord('pepper','גמבה'),
        new TranslatedWord('cucumber','מלפפון')  

    ]),

    new Category(2,'fruits',Language.English,Language.Hebrew, [
        new TranslatedWord('pineapple','אננס'),
        new TranslatedWord('apple','תפוח'),
        new TranslatedWord('watermelon','אבטיח'),
        new TranslatedWord('melon','מלון')  
    ]),
]    