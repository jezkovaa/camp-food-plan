import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FoodRestriction } from '../enums/food-restriction.enum';
import { Course } from '../enums/courses.enum';
import { IRecipeVariant } from '../interfaces/recipe-variant.interface';
import { IRecipe } from '../interfaces/recipe.interface';
import { ID } from 'src/app/types';
import { IDayMealRecipeNames } from '../interfaces/day-meal-names.interface';
import { IDayMealRecipe } from '../interfaces/day-menu.interface';
import { Units } from '../enums/units.enum';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  restrictions = FoodRestriction;

  oldRecipes: IRecipe[] = [];
  dummyRecipes: IRecipe[] = [
    {
      id: "r1", name: 'Špagety',
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: "v1",
          recipeId: "r1",
          name: 'Špagety s paradajkovou omáčkou',
          ingredients: [
            { name: 'špagety', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajková omáčka', quantity: 150, unit: Units.MILLILITERS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'oregano', quantity: 1, unit: Units.TEASPOONS, durability: 5 }
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
          id: "v2",
          recipeId: "r1",
          name: 'Špagety s bazalkovým pestom',
          ingredients: [
            { name: 'špagety', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'bazalkové pesto', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'parmezán', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 }
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
      id: "r2", name: 'Palačinky', courses: [Course.SNACK], variants: [
        {
          id: "v1",
          recipeId: "r2",
          name: 'Palačinky s džemom',
          ingredients: [
            {
              name: 'múka',
              quantity: 200,
              unit: Units.GRAMS,
              durability: 2
            },
            {
              name: 'mlieko',
              quantity: 300,
              unit: Units.MILLILITERS,
              durability: 3
            },
            { name: 'vajcia', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'džem', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
          id: "v2",
          recipeId: "r2",
          name: 'Palačinky s nutellou',
          ingredients: [
            { name: 'múka', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'mlieko', quantity: 300, unit: Units.MILLILITERS, durability: 5 },
            { name: 'vajcia', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'nutella', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
          id: "v3",
          recipeId: "r2",
          name: 'Palačinky s tvarohom a ovocím',
          ingredients: [
            { name: 'múka', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'mlieko', quantity: 300, unit: Units.MILLILITERS, durability: 5 },
            { name: 'vajcia', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'tvaroh', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'ovocie', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
      id: "r3", name: 'Zeleninové Stir Fry', courses: [Course.DINNER, Course.LUNCH], variants: [
        {
          id: "v1",
          recipeId: "r3",
          name: 'Zeleninové Stir Fry s ryžou',
          ingredients: [
            { name: 'brokolica', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'mrkva', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'paprika', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'sójová omáčka', quantity: 50, unit: Units.MILLILITERS, durability: 5 }
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
      id: "r4", name: 'Kapustnica', courses: [Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r4",
          name: 'Kapustnica s klobásou',
          ingredients: [
            { name: 'kyslá kapusta', quantity: 500, unit: Units.GRAMS, durability: 5 },
            { name: 'klobása', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'zemiaky', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 3, unit: Units.PIECES, durability: 5 },
            { name: 'bobkový list', quantity: 2, unit: Units.PIECES, durability: 5 }
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
      id: "r5", name: 'Bryndzové halušky', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r5",
          name: 'Bryndzové halušky s bryndzou a slaninou',
          ingredients: [
            { name: 'zemiaky', quantity: 500, unit: Units.GRAMS, durability: 5 },
            { name: 'múka', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'bryndza', quantity: 250, unit: Units.GRAMS, durability: 5 },
            { name: 'slanina', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
      id: "r6", name: 'Guláš', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r6",
          name: 'Guláš s knedľou',
          ingredients: [
            { name: 'hovädzie mäso', quantity: 500, unit: Units.GRAMS, durability: 5 },
            { name: 'cibuľa', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paprika', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajkový pretlak', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 3, unit: Units.PIECES, durability: 5 }
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
      id: "r7", name: 'Caesar šalát', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r7",
          name: 'Caesar šalát s kuracím mäsom',
          ingredients: [
            { name: 'rímsky šalát', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'parmezán', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'krutóny', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'caesar dressing', quantity: 50, unit: Units.MILLILITERS, durability: 5 }
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
      id: "r8", name: 'Lasagna', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r8",
          name: 'Lasagna s mletým hovädzím mäsom',
          ingredients: [
            { name: 'lasagne pláty', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'mleté hovädzie mäso', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajková omáčka', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'bešamel', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'parmezán', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
      id: "r9", name: 'Chicken Curry', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r9",
          name: 'Chicken Curry s kokosovým mliekom',
          ingredients: [
            { name: 'kuracie prsia', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'kokosové mlieko', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'kari pasta', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 }
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
      id: "r10", name: 'Beef Stroganoff', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r10",
          name: 'Beef Stroganoff s hovädzím mäsom a šampiňónmi',
          ingredients: [
            { name: 'hovädzie mäso', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'šampiňóny', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'smotana', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'horčica', quantity: 50, unit: Units.GRAMS, durability: 5 }
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
      id: "r11", name: 'Tacos', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r11",
          name: 'Tacos s mletým hovädzím mäsom',
          ingredients: [
            { name: 'tortilly', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'mleté hovädzie mäso', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'salsa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'šalát', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
      id: "r12", name: 'Pizza Margherita', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r12",
          name: 'Pizza Margherita s mozzarellou a bazalkou',
          ingredients: [
            { name: 'pizza cesto', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajková omáčka', quantity: 100, unit: Units.MILLILITERS, durability: 5 },
            { name: 'mozzarella', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'bazalka', quantity: 10, unit: Units.GRAMS, durability: 5 }
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
      id: "r13", name: 'Sushi', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r13",
          name: 'Sushi s lososom a avokádom',
          ingredients: [
            { name: 'sushi ryža', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'nori pláty', quantity: 5, unit: Units.PIECES, durability: 5 },
            { name: 'losos', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'uhorka', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'avokádo', quantity: 100, unit: Units.GRAMS, durability: 5 }
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
      id: "r14", name: 'Pad Thai', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r14",
          name: 'Pad Thai s kuracím mäsom a arašidmi',
          ingredients: [
            { name: 'ryžové rezance', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'vajcia', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'arašidy', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'tamari omáčka', quantity: 50, unit: Units.MILLILITERS, durability: 5 }
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
      id: "r15", name: 'Miso Soup', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r15",
          name: 'Miso Soup s tofu a wakame',
          ingredients: [
            { name: 'miso pasta', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'tofu', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'wakame', quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: 'zelená cibuľka', quantity: 20, unit: Units.GRAMS, durability: 5 }
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
      id: "r16", name: 'Ratatouille', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r16",
          name: 'Ratatouille s baklažánom a cuketou',
          ingredients: [
            { name: 'baklažán', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'cuketa', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajky', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paprika', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 }
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
      id: "r17", name: 'Falafel', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r17",
          name: 'Falafel s cícerom a petržlenom',
          ingredients: [
            { name: 'cícer', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 },
            { name: 'petržlen', quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: 'múka', quantity: 50, unit: Units.GRAMS, durability: 5 }
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
      id: "r18", name: 'Biryani', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r18",
          name: 'Biryani s kuracím mäsom a jogurtom',
          ingredients: [
            { name: 'basmati ryža', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'kuracie prsia', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'jogurt', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'kari korenie', quantity: 20, unit: Units.GRAMS, durability: 5 }
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
      id: "r19", name: 'Chili con Carne', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r19",
          name: 'Chili con Carne s červenou fazuľou',
          ingredients: [
            { name: 'mleté hovädzie mäso', quantity: 300, unit: Units.GRAMS, durability: 5 },
            { name: 'červená fazuľa', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'paradajková omáčka', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'cibuľa', quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: 'cesnak', quantity: 2, unit: Units.PIECES, durability: 5 }
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
      id: "r20", name: 'Quiche Lorraine', courses: [Course.LUNCH, Course.DINNER], variants: [
        {
          id: "v1",
          recipeId: "r20",
          name: 'Quiche Lorraine s lístkovým cestom a slaninou',
          ingredients: [
            { name: 'lístkové cesto', quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: 'slanina', quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: 'vajcia', quantity: 3, unit: Units.PIECES, durability: 5 },
            { name: 'smotana', quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: 'syr', quantity: 100, unit: Units.GRAMS, durability: 5 }
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

  getRecipe(id: ID): Observable<any> {

    const recipe = this.dummyRecipes.find(recipe => recipe.id === id);
    return of(recipe || null);

  }

  createRecipe(recipe: any): Observable<any> {
    //todo
    return of(null);
  }

  getVariant(recipeId: ID, variantId: ID): Observable<any> {

    const recipe = this.dummyRecipes.find(recipe => recipe.id === recipeId);
    const variant = recipe?.variants.find(variant => variant.id === variantId);

    return of(variant || null);

  }

  getVariants(recipeID: ID, selectedIds: ID[]): Observable<IRecipeVariant[]> {
    const recipe = this.dummyRecipes.find(recipe => recipe.id === recipeID);
    if (recipe) {
      return of(recipe.variants.filter(variant => selectedIds.includes(variant.id)));
    }
    return of([]);
  }

  deleteVariants(recipeId: ID, variantIds: ID[]): Observable<IRecipeVariant[]> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes.filter(recipe => recipe.id === recipeId).forEach(recipe => {
      recipe.variants = recipe.variants.filter(variant => !variantIds.includes(variant.id));
    });

    const recipe = this.dummyRecipes.find(recipe => recipe.id === recipeId);
    if (recipe) {
      return of(recipe.variants);
    }
    return throwError(() => new Error('Recipe not found'));

  }

  deleteVariant(recipeId: ID, variantId: ID): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes.filter(recipe => recipe.id === recipeId).forEach(recipe => {
      recipe.variants = recipe.variants.filter(variant => variant.id !== variantId);
    });

    return of(true);
  }

  saveVariant(variant: IRecipeVariant) {
    this.oldRecipes = this.dummyRecipes;

    const recipe = this.dummyRecipes.find(recipe => recipe.id === variant.recipeId);
    if (recipe) {
      const index = recipe.variants.findIndex(v => v.id === variant.id);
      if (index === -1) {
        recipe.variants.push(variant);
      } else {
        recipe.variants[index] = variant;
      }
    }

    return of(variant);
  }


  saveRecipe(recipe: IRecipe): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    const index = this.dummyRecipes.findIndex(r => r.id === recipe.id);

    if (index === -1) {
      this.dummyRecipes.push(recipe);
    } else {
      this.dummyRecipes[index] = recipe;
    }

    return of(recipe);
  }

  deleteRecipe(recipeId: ID): Observable<any> {

    this.oldRecipes = this.dummyRecipes;

    this.dummyRecipes = this.dummyRecipes.filter(recipe => recipe.id !== recipeId);

    return of(true);
  }

  getNames(chosenRecipes: IDayMealRecipe[]): Observable<IDayMealRecipeNames[]> {
    const filteredRecipes = this.dummyRecipes
      .filter(recipe =>
        chosenRecipes.some(chosenRecipe => chosenRecipe.recipeId === recipe.id) // Filter recipes by recipeId
      )
      .map(recipe => ({
        id: recipe.id!,
        name: recipe.name,
        variants: recipe.variants
          .filter(variant =>
            chosenRecipes.some(chosenRecipe =>
              chosenRecipe.recipeId === recipe.id &&
              chosenRecipe.variants.some(chosenVariant => chosenVariant.variantId === variant.id)
            )
          ) // Filter variants by variantId
          .map(variant => ({
            variantId: variant.id,
            variantName: variant.name,
            variantRestrictions: variant.restrictions
          }))
      }));

    return of(filteredRecipes);
  }
}