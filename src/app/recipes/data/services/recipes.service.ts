import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoodRestriction } from '../enums/food-restriction.enum';
import { Course } from '../enums/courses.enum';
import { RecipeVariant } from '../interfaces/recipe-variant.interface';
import { Recipe } from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  restrictions = FoodRestriction;

  oldRecipes: Recipe[] = [];
  dummyRecipes: Recipe[] = [
    {
      id: 1, name: 'Špagety',
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: 1,
          recipeId: 1,
          name: 'Špagety s paradajkovou omáčkou',
          ingredients: [
            { name: 'špagety', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paradajková omáčka', quantity: 150, unit: 'ml', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 },
            { name: 'oregano', quantity: 1, unit: 'čajová lyžička', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGAN],
          proceeding: [
            { order: 1, description: 'Uvarte špagety v osolenej vode' },
            { order: 2, description: 'Na panvici orestujte cesnak a pridajte paradajkovú omáčku' },
            { order: 3, description: 'Pridajte uvarené špagety a premiešajte' },
            { order: 4, description: 'Podávajte posypané oreganom' }
          ],
          historyOfChanges: []
        },
        {
          id: 2,
          recipeId: 1,
          name: 'Špagety s bazalkovým pestom',
          ingredients: [
            { name: 'špagety', quantity: 200, unit: 'g', durability: 5 },
            { name: 'bazalkové pesto', quantity: 100, unit: 'g', durability: 5 },
            { name: 'parmezán', quantity: 50, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN],
          proceeding: [
            { order: 1, description: 'Uvarte špagety v osolenej vode' },
            { order: 2, description: 'Na panvici orestujte cesnak a pridajte bazalkové pesto' },
            { order: 3, description: 'Pridajte uvarené špagety a premiešajte' },
            { order: 4, description: 'Podávajte posypané parmezánom' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 2, name: 'Palačinky', courses: [Course.SNACK], variants: [
        {
          id: 3,
          recipeId: 2,
          name: 'Palačinky s džemom',
          ingredients: [
            {
              name: 'múka',
              quantity: 200,
              unit: 'g',
              durability: 2
            },
            {
              name: 'mlieko',
              quantity: 300,
              unit: 'ml',
              durability: 3
            },
            { name: 'vajcia', quantity: 2, unit: 'ks', durability: 5 },
            { name: 'džem', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN, FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Zmiešajte múku, mlieko a vajcia' },
            { order: 2, description: 'Vytvorte zmes a opečte palačinky' },
            { order: 3, description: 'Posypte džemom a zrolujte' }
          ],
          historyOfChanges: []
        },
        {
          id: 4,
          recipeId: 2,
          name: 'Palačinky s nutellou',
          ingredients: [
            { name: 'múka', quantity: 200, unit: 'g', durability: 5 },
            { name: 'mlieko', quantity: 300, unit: 'ml', durability: 5 },
            { name: 'vajcia', quantity: 2, unit: 'ks', durability: 5 },
            { name: 'nutella', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN],
          proceeding: [
            { order: 1, description: 'Zmiešajte múku, mlieko a vajcia' },
            { order: 2, description: 'Vytvorte zmes a opečte palačinky' },
            { order: 3, description: 'Posypte nutellou a zrolujte' }
          ],
          historyOfChanges: []
        },
        {
          id: 5,
          recipeId: 2,
          name: 'Palačinky s tvarohom a ovocím',
          ingredients: [
            { name: 'múka', quantity: 200, unit: 'g', durability: 5 },
            { name: 'mlieko', quantity: 300, unit: 'ml', durability: 5 },
            { name: 'vajcia', quantity: 2, unit: 'ks', durability: 5 },
            { name: 'tvaroh', quantity: 150, unit: 'g', durability: 5 },
            { name: 'ovocie', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN],
          proceeding: [
            { order: 1, description: 'Zmiešajte múku, mlieko a vajcia' },
            { order: 2, description: 'Vytvorte zmes a opečte palačinky' },
            { order: 3, description: 'Posypte tvarohom a ovocím a zrolujte' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 3, name: 'Zeleninové Stir Fry', courses: [Course.DINNER, Course.LUNCH], variants: [
        {
          id: 6,
          recipeId: 3,
          name: 'Zeleninové Stir Fry s ryžou',
          ingredients: [
            { name: 'brokolica', quantity: 200, unit: 'g', durability: 5 },
            { name: 'mrkva', quantity: 150, unit: 'g', durability: 5 },
            { name: 'paprika', quantity: 150, unit: 'g', durability: 5 },
            { name: 'sójová omáčka', quantity: 50, unit: 'ml', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte zeleninu' },
            { order: 2, description: 'Pridajte sójovú omáčku' },
            { order: 3, description: 'Podávajte s ryžou' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 4, name: 'Kapustnica', courses: [Course.DINNER], variants: [
        {
          id: 7,
          recipeId: 4,
          name: 'Kapustnica s klobásou',
          ingredients: [
            { name: 'kyslá kapusta', quantity: 500, unit: 'g', durability: 5 },
            { name: 'klobása', quantity: 200, unit: 'g', durability: 5 },
            { name: 'zemiaky', quantity: 300, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 3, unit: 'strúčiky', durability: 5 },
            { name: 'bobkový list', quantity: 2, unit: 'ks', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Uvarte kyslú kapustu' },
            { order: 2, description: 'Pridajte klobásu a zemiaky' },
            { order: 3, description: 'Podávajte s cesnakom a bobkovým listom' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 5, name: 'Bryndzové halušky', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 8,
          recipeId: 5,
          name: 'Bryndzové halušky s bryndzou a slaninou',
          ingredients: [
            { name: 'zemiaky', quantity: 500, unit: 'g', durability: 5 },
            { name: 'múka', quantity: 200, unit: 'g', durability: 5 },
            { name: 'bryndza', quantity: 250, unit: 'g', durability: 5 },
            { name: 'slanina', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Uvarte zemiaky' },
            { order: 2, description: 'Vytvorte cesto a vytvorte halušky' },
            { order: 3, description: 'Orestujte slaninu a pridajte bryndzu' },
            { order: 4, description: 'Podávajte s haluškami' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 6, name: 'Guláš', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 9,
          recipeId: 6,
          name: 'Guláš s knedľou',
          ingredients: [
            { name: 'hovädzie mäso', quantity: 500, unit: 'g', durability: 5 },
            { name: 'cibuľa', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paprika', quantity: 150, unit: 'g', durability: 5 },
            { name: 'paradajkový pretlak', quantity: 100, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 3, unit: 'strúčiky', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte cibuľu a cesnak' },
            { order: 2, description: 'Pridajte mäso a papriku' },
            { order: 3, description: 'Pridajte paradajkový pretlak' },
            { order: 4, description: 'Podávajte s knedľou' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 7, name: 'Caesar šalát', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 10,
          recipeId: 7,
          name: 'Caesar šalát s kuracím mäsom',
          ingredients: [
            { name: 'rímsky šalát', quantity: 200, unit: 'g', durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: 'g', durability: 5 },
            { name: 'parmezán', quantity: 50, unit: 'g', durability: 5 },
            { name: 'krutóny', quantity: 50, unit: 'g', durability: 5 },
            { name: 'caesar dressing', quantity: 50, unit: 'ml', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Nakrájajte rímsky šalát' },
            { order: 2, description: 'Pridajte kuracie mäso, parmezán a krutóny' },
            { order: 3, description: 'Podávajte s caesar dressingom' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 8, name: 'Lasagna', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 11,
          recipeId: 8,
          name: 'Lasagna s mletým hovädzím mäsom',
          ingredients: [
            { name: 'lasagne pláty', quantity: 200, unit: 'g', durability: 5 },
            { name: 'mleté hovädzie mäso', quantity: 300, unit: 'g', durability: 5 },
            { name: 'paradajková omáčka', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'bešamel', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'parmezán', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Vytvorte vrstvy lasagne plátov, mäsa, paradajkovej omáčky a bešamelu' },
            { order: 2, description: 'Pečte v rúre' },
            { order: 3, description: 'Posypte parmezánom' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 9, name: 'Chicken Curry', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 12,
          recipeId: 9,
          name: 'Chicken Curry s kokosovým mliekom',
          ingredients: [
            { name: 'kuracie prsia', quantity: 300, unit: 'g', durability: 5 },
            { name: 'kokosové mlieko', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'kari pasta', quantity: 50, unit: 'g', durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte cibuľu a cesnak' },
            { order: 2, description: 'Pridajte kari pastu a kuracie mäso' },
            { order: 3, description: 'Pridajte kokosové mlieko' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 10, name: 'Beef Stroganoff', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 13,
          recipeId: 10,
          name: 'Beef Stroganoff s hovädzím mäsom a šampiňónmi',
          ingredients: [
            { name: 'hovädzie mäso', quantity: 300, unit: 'g', durability: 5 },
            { name: 'šampiňóny', quantity: 150, unit: 'g', durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'smotana', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'horčica', quantity: 50, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte cibuľu' },
            { order: 2, description: 'Pridajte hovädzie mäso a šampiňóny' },
            { order: 3, description: 'Pridajte smotanu a horčicu' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 11, name: 'Tacos', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 14,
          recipeId: 11,
          name: 'Tacos s mletým hovädzím mäsom',
          ingredients: [
            { name: 'tortilly', quantity: 200, unit: 'g', durability: 5 },
            { name: 'mleté hovädzie mäso', quantity: 300, unit: 'g', durability: 5 },
            { name: 'salsa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'šalát', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte mäso' },
            { order: 2, description: 'Plňte tortilly mäsom, salsou a šalátom' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 12, name: 'Pizza Margherita', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 15,
          recipeId: 12,
          name: 'Pizza Margherita s mozzarellou a bazalkou',
          ingredients: [
            { name: 'pizza cesto', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paradajková omáčka', quantity: 100, unit: 'ml', durability: 5 },
            { name: 'mozzarella', quantity: 150, unit: 'g', durability: 5 },
            { name: 'bazalka', quantity: 10, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGETARIAN],
          proceeding: [
            { order: 1, description: 'Rozvaľkajte cesto' },
            { order: 2, description: 'Natriete paradajkovou omáčkou' },
            { order: 3, description: 'Pridajte mozzarellu a bazalku' },
            { order: 4, description: 'Pečte v rúre' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 13, name: 'Sushi', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 16,
          recipeId: 13,
          name: 'Sushi s lososom a avokádom',
          ingredients: [
            { name: 'sushi ryža', quantity: 200, unit: 'g', durability: 5 },
            { name: 'nori pláty', quantity: 5, unit: 'ks', durability: 5 },
            { name: 'losos', quantity: 150, unit: 'g', durability: 5 },
            { name: 'uhorka', quantity: 100, unit: 'g', durability: 5 },
            { name: 'avokádo', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Uvarte sushi ryžu' },
            { order: 2, description: 'Rozložte ryžu na nori pláty' },
            { order: 3, description: 'Pridajte lososa, uhorku a avokádo' },
            { order: 4, description: 'Zrolujte a nakrájajte na kúsky' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 14, name: 'Pad Thai', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 17,
          recipeId: 14,
          name: 'Pad Thai s kuracím mäsom a arašidmi',
          ingredients: [
            { name: 'ryžové rezance', quantity: 200, unit: 'g', durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: 'g', durability: 5 },
            { name: 'vajcia', quantity: 2, unit: 'ks', durability: 5 },
            { name: 'arašidy', quantity: 50, unit: 'g', durability: 5 },
            { name: 'tamari omáčka', quantity: 50, unit: 'ml', durability: 5 }
          ],
          restrictions: [FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Uvarte ryžové rezance' },
            { order: 2, description: 'Na panvici orestujte kuracie mäso' },
            { order: 3, description: 'Pridajte vajcia, ryžové rezance a arašidy' },
            { order: 4, description: 'Podávajte s tamari omáčkou' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 15, name: 'Miso Soup', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 18,
          recipeId: 15,
          name: 'Miso Soup s tofu a wakame',
          ingredients: [
            { name: 'miso pasta', quantity: 50, unit: 'g', durability: 5 },
            { name: 'tofu', quantity: 100, unit: 'g', durability: 5 },
            { name: 'wakame', quantity: 10, unit: 'g', durability: 5 },
            { name: 'zelená cibuľka', quantity: 20, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Rozmiešajte miso pastu v horúcej vode' },
            { order: 2, description: 'Pridajte tofu, wakame a zelenú cibuľku' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 16, name: 'Ratatouille', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 19,
          recipeId: 16,
          name: 'Ratatouille s baklažánom a cuketou',
          ingredients: [
            { name: 'baklažán', quantity: 200, unit: 'g', durability: 5 },
            { name: 'cuketa', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paradajky', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paprika', quantity: 150, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte zeleninu' },
            { order: 2, description: 'Pridajte cesnak a paradajky' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 17, name: 'Falafel', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 20,
          recipeId: 17,
          name: 'Falafel s cícerom a petržlenom',
          ingredients: [
            { name: 'cícer', quantity: 200, unit: 'g', durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 },
            { name: 'petržlen', quantity: 50, unit: 'g', durability: 5 },
            { name: 'múka', quantity: 50, unit: 'g', durability: 5 }
          ],
          restrictions: [FoodRestriction.VEGAN],
          proceeding: [
            { order: 1, description: 'Zmiešajte cícer, cibuľu, cesnak a petržlen' },
            { order: 2, description: 'Vytvorte cesto a vytvorte guličky' },
            { order: 3, description: 'Opečte na panvici' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 18, name: 'Biryani', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 21,
          recipeId: 18,
          name: 'Biryani s kuracím mäsom a jogurtom',
          ingredients: [
            { name: 'basmati ryža', quantity: 200, unit: 'g', durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: 'g', durability: 5 },
            { name: 'jogurt', quantity: 100, unit: 'g', durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'kari korenie', quantity: 20, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Uvarte ryžu' },
            { order: 2, description: 'Na panvici orestujte cibuľu a kuracie mäso' },
            { order: 3, description: 'Pridajte kari korenie a jogurt' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 19, name: 'Chili con Carne', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 22,
          recipeId: 19,
          name: 'Chili con Carne s červenou fazuľou',
          ingredients: [
            { name: 'mleté hovädzie mäso', quantity: 300, unit: 'g', durability: 5 },
            { name: 'červená fazuľa', quantity: 200, unit: 'g', durability: 5 },
            { name: 'paradajková omáčka', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: 'g', durability: 5 },
            { name: 'cesnak', quantity: 2, unit: 'strúčiky', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Na panvici orestujte cibuľu a cesnak' },
            { order: 2, description: 'Pridajte mäso a fazuľu' },
            { order: 3, description: 'Pridajte paradajkovú omáčku' }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 20, name: 'Quiche Lorraine', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: 23,
          recipeId: 20,
          name: 'Quiche Lorraine s lístkovým cestom a slaninou',
          ingredients: [
            { name: 'lístkové cesto', quantity: 200, unit: 'g', durability: 5 },
            { name: 'slanina', quantity: 150, unit: 'g', durability: 5 },
            { name: 'vajcia', quantity: 3, unit: 'ks', durability: 5 },
            { name: 'smotana', quantity: 200, unit: 'ml', durability: 5 },
            { name: 'syr', quantity: 100, unit: 'g', durability: 5 }
          ],
          restrictions: [],
          proceeding: [
            { order: 1, description: 'Rozvaľkajte cesto a vytvorte formu' },
            { order: 2, description: 'Orestujte slaninu a vytvorte zmes s vajcami a smotanou' },
            { order: 3, description: 'Nalejte zmes do cesta a posypte syrom' },
            { order: 4, description: 'Pečte v rúre' }
          ],
          historyOfChanges: []
        }
      ]
    }
  ];

  constructor() {

  }

  getRecipes(): Observable<any> {

    return of(this.dummyRecipes);
  }

  getRecipe(id: number): Observable<any> {

    const recipe = this.dummyRecipes.find(recipe => recipe.id === id);
    return of(recipe || null);

  }

  createRecipe(recipe: any): Observable<any> {
    //todo
    return of(null);
  }

  getVariant(recipeId: number, variantId: number): Observable<any> {

    const recipe = this.dummyRecipes.find(recipe => recipe.id === recipeId);
    const variant = recipe?.variants.find(variant => variant.id === variantId);

    return of(variant || null);

  }

  deleteVariants(recipeId: number, variantIds: number[]): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes.filter(recipe => recipe.id === recipeId).forEach(recipe => {
      recipe.variants = recipe.variants.filter(variant => !variantIds.includes(variant.id));
    });

    return of(true);

  }


  saveRecipe(recipe: Recipe): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    const index = this.dummyRecipes.findIndex(r => r.id === recipe.id);

    if (index === -1) {
      this.dummyRecipes.push(recipe);
    } else {
      this.dummyRecipes[index] = recipe;
    }

    return of(true);
  }

  deleteRecipe(recipeId: number): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes = this.dummyRecipes.filter(recipe => recipe.id !== recipeId);

    return of(true);
  }
}