import { Injectable, OnInit } from "@angular/core";
import { Course } from "../enums/courses.enum";
import { Units } from "../enums/units.enum";
import { FoodRestriction } from "../enums/food-restriction.enum";
import { IRecipe } from "../interfaces/recipe.interface";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class BaseRecipeService {

  recipeId = 31;
  variantId = 32;

  constructor(private translateService: TranslateService) { }


  oldRecipes: IRecipe[] = [];
  public dummyRecipes: IRecipe[] = [

    //breakfast
    {
      id: 'r1',
      name: this.translateService.instant('dummy-recipes.recipes.bread-butter-jam-milk.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v1',
          recipeId: "r1",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter'), quantity: 20, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.jam'), quantity: 30, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.milk'), quantity: 200, unit: Units.MILLILITERS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-jam-milk.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-jam-milk.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-jam-milk.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-jam-milk.step4') },
            { order: 5, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-jam-milk.step5') },

          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r2',
      name: this.translateService.instant('dummy-recipes.recipes.bread-pasty.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v2',
          recipeId: "r2",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 1.5, unit: Units.PIECES, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.pasty'), quantity: 30, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-pasty.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-pasty.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-pasty.step3') },

          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r3',
      name: this.translateService.instant('dummy-recipes.recipes.bread-nutella-cocoa.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v3',
          recipeId: "r3",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.nutella'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.cocoa'), quantity: 200, unit: Units.MILLILITERS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-nutella-cocoa.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-nutella-cocoa.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-nutella-cocoa.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.bread-nutella-cocoa.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r4',
      name: this.translateService.instant('dummy-recipes.recipes.musli.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v4',
          recipeId: "r4",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.musli'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.milk'), quantity: 200, unit: Units.MILLILITERS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.musli.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.musli.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.musli.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r5',
      name: this.translateService.instant('dummy-recipes.recipes.bread-butter-sausage.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v5',
          recipeId: "r5",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter'), quantity: 20, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.sausage'), quantity: 50, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-sausage.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-sausage.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-sausage.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.bread-butter-sausage.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r6',
      name: this.translateService.instant('dummy-recipes.recipes.bread-crud-spread.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v6',
          recipeId: "r6",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.crud'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.salt'), quantity: 5, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 15, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-crud-spread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-crud-spread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-crud-spread.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r7',
      name: this.translateService.instant('dummy-recipes.recipes.bread-garlic-spread.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v7',
          recipeId: "r7",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter-veto'), quantity: 20, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.salt'), quantity: 5, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.cheese-veto'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 15, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-garlic-spread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-garlic-spread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-garlic-spread.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.bread-garlic-spread.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r8',
      name: this.translateService.instant('dummy-recipes.recipes.bread-bryndza-spread.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v8',
          recipeId: "r8",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.bryndza'), quantity: 50, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.bread-bryndza-spread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.bread-bryndza-spread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.bread-bryndza-spread.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r9',
      name: this.translateService.instant('dummy-recipes.recipes.rice-porridge-with-butter.title'),
      courses: [Course.BREAKFAST],
      variants: [
        {
          id: 'v9',
          recipeId: "r9",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.rice'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter'), quantity: 20, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.rice-porridge-with-butter.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.rice-porridge-with-butter.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.rice-porridge-with-butter.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },

    //lunch
    {
      id: 'r10',
      name: this.translateService.instant('dummy-recipes.recipes.lentil-soup-with-wurst.title'),
      courses: [Course.LUNCH],
      variants: [
        {
          id: 'v10',
          recipeId: "r10",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.lentil'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.wurst'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.lentil-soup-with-wurst.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.lentil-soup-with-wurst.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.lentil-soup-with-wurst.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r11',
      name: this.translateService.instant('dummy-recipes.recipes.spaghetti.title'),
      courses: [Course.LUNCH],
      variants: [
        {
          id: 'v11',
          recipeId: "r11",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.spaghetti'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.basil'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.puree'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.morcadela'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            {
              name: this.translateService?.instant('dummy-recipes.ingredients.chicken'),
              quantity: 150, unit: Units.GRAMS, durability: 5,
            }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step4') }
          ],
          historyOfChanges: []
        },
        {
          id: 'v31',
          recipeId: "r11",
          name: "Vegetariánské špagety",
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.spaghetti'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.basil'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.puree'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.morcadela'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 50, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.spaghetti.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r12',
      name: this.translateService.instant('dummy-recipes.recipes.chicken-with-pasta.title'),
      courses: [Course.LUNCH],
      variants: [
        {
          id: 'v12',
          recipeId: "r12",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.pasta'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.chicken'), quantity: 150, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-pasta.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-pasta.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-pasta.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r13',
      name: this.translateService.instant('dummy-recipes.recipes.leco.title'),
      courses: [Course.LUNCH],
      variants: [
        {
          id: 'v13',
          recipeId: "r13",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.potato'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.tomato'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.leco.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.leco.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.leco.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r14',
      name: this.translateService.instant('dummy-recipes.recipes.french-potatoes.title'),
      courses: [Course.LUNCH],
      variants: [
        {
          id: 'v14',
          recipeId: "r14",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.potato'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.pepper'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.tomato'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.french-potatoes.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.french-potatoes.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.french-potatoes.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },

    //dinner
    {
      id: 'r15',
      name: this.translateService.instant('dummy-recipes.recipes.wurst-with-bread-mustard.title'),
      courses: [Course.DINNER],
      variants: [
        {
          id: 'v15',
          recipeId: "r15",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.mustard'), quantity: 20, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.wurst'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.wurst-with-bread-mustard.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.wurst-with-bread-mustard.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.wurst-with-bread-mustard.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.wurst-with-bread-mustard.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r16',
      name: this.translateService.instant('dummy-recipes.recipes.pasta-with-poppy.title'),
      courses: [Course.DINNER],
      variants: [
        {
          id: 'v16',
          recipeId: "r16",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.pasta'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.poppy'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.sugar'), quantity: 20, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.pasta-with-poppy.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.pasta-with-poppy.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.pasta-with-poppy.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r17',
      name: this.translateService.instant('dummy-recipes.recipes.sardines-spread.title'),
      courses: [Course.DINNER],
      variants: [
        {
          id: 'v17',
          recipeId: "r17",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.sardines'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 20, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.salt'), quantity: 5, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.sardines-spread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.sardines-spread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.sardines-spread.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r18',
      name: this.translateService.instant('dummy-recipes.recipes.egg-spread.title'),
      courses: [Course.DINNER],
      variants: [
        {
          id: 'v18',
          recipeId: "r18",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.egg-spread'), quantity: 50, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN, FoodRestriction.LACTOSE_INTOLERANT]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.egg-spread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.egg-spread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.egg-spread.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },

    //snacks and morning snacks
    {
      id: 'r19',
      name: this.translateService.instant('dummy-recipes.recipes.yoghurt.title'),
      courses: [Course.SNACK, Course.MORNING_SNACK],
      variants: [
        {
          id: 'v19',
          recipeId: "r19",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.yoghurt'), quantity: 150, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [],
          historyOfChanges: []
        },
        {
          id: 'v28',
          recipeId: "r19",
          name: this.translateService.instant('dummy-recipes.recipes.yoghurt.nolactose'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.yoghurt-veto'), quantity: 150, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN]),
          proceeding: [],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r20',
      name: this.translateService.instant('dummy-recipes.recipes.fruit.title'),
      courses: [Course.SNACK, Course.MORNING_SNACK],
      variants: [
        {
          id: 'v20',
          recipeId: "r20",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.fruit'), quantity: 1, unit: Units.PIECES, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE]),
          proceeding: [

          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r21',
      name: this.translateService.instant('dummy-recipes.recipes.apple.title'),
      courses: [Course.SNACK, Course.MORNING_SNACK],
      variants: [
        {
          id: 'v21',
          recipeId: "r21",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.apple'), quantity: 1, unit: Units.PIECES, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE]),
          proceeding: [
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r22',
      name: this.translateService.instant('dummy-recipes.recipes.banana.title'),
      courses: [Course.SNACK, Course.MORNING_SNACK],
      variants: [
        {
          id: 'v22',
          recipeId: "r22",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.banana'), quantity: 1, unit: Units.PIECES, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN, FoodRestriction.VEGAN, FoodRestriction.GLUTEN_FREE]),
          proceeding: [
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r27',
      name: this.translateService.instant('dummy-recipes.recipes.biscuit.title'),
      courses: [Course.SNACK, Course.MORNING_SNACK],
      variants: [
        {
          id: 'v27',
          recipeId: "r27",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.biscuit'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN]),
          proceeding: [],
          historyOfChanges: []
        },
        {
          id: 'v29',
          recipeId: "r27",
          name: this.translateService.instant('dummy-recipes.recipes.biscuit.gluten-free'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.biscuit-gluten-free'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.GLUTEN_FREE, FoodRestriction.LACTOSE_INTOLERANT, FoodRestriction.VEGETARIAN]),
          proceeding: [],
          historyOfChanges: []
        },

      ],
    },

    //lunch and dinner
    {
      id: 'r23',
      name: this.translateService.instant('dummy-recipes.recipes.sac-soup-bread.title'),
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: 'v23',
          recipeId: "r23",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.bagged-soup'), quantity: 200, unit: Units.MILLILITERS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.bread'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.sac-soup-bread.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.sac-soup-bread.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.sac-soup-bread.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r24',
      name: this.translateService.instant('dummy-recipes.recipes.pumpkin-soup.title'),
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: 'v24',
          recipeId: "r24",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.pumpkin'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter'), quantity: 20, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>([FoodRestriction.VEGETARIAN]),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.pumpkin-soup.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.pumpkin-soup.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.pumpkin-soup.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r25',
      name: this.translateService.instant('dummy-recipes.recipes.oat-meal.title'),
      courses: [Course.BREAKFAST, Course.SNACK],
      variants: [
        {
          id: 'v25',
          recipeId: "r25",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.oat'), quantity: 100, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.butter'), quantity: 20, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.oat-meal.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.oat-meal.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.oat-meal.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r26',
      name: this.translateService.instant('dummy-recipes.recipes.chicken-with-paprika-sauce.title'),
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: 'v26',
          recipeId: "r26",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.potato'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.chicken'), quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.onion'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.garlic'), quantity: 10, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.paprika'), quantity: 50, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.tomato'), quantity: 50, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-paprika-sauce.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-paprika-sauce.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-paprika-sauce.step3') },
            { order: 4, description: this.translateService?.instant('dummy-recipes.recipes.chicken-with-paprika-sauce.step4') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r29',
      name: this.translateService.instant('dummy-recipes.recipes.pancakes.title'),
      courses: [Course.DINNER],
      variants: [
        {
          id: 'v30',
          recipeId: "r29",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.milk'), quantity: 250, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.flour'), quantity: 150, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.egg'), quantity: 1.5, unit: Units.PIECES, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.pancakes.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.pancakes.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.pancakes.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    {
      id: 'r30',
      name: this.translateService.instant('dummy-recipes.recipes.beans.title'),
      courses: [Course.LUNCH, Course.DINNER],
      variants: [
        {
          id: 'v31',
          recipeId: "r30",
          name: this.translateService.instant('dummy-recipes.recipes.subtitle'),
          ingredients: [
            { name: this.translateService?.instant('dummy-recipes.ingredients.beans'), quantity: 200, unit: Units.GRAMS, durability: 5 },
            { name: this.translateService?.instant('dummy-recipes.ingredients.wurst'), quantity: 100, unit: Units.GRAMS, durability: 5 }
          ],
          restrictions: new Set<FoodRestriction>(),
          proceeding: [
            { order: 1, description: this.translateService?.instant('dummy-recipes.recipes.beans.step1') },
            { order: 2, description: this.translateService?.instant('dummy-recipes.recipes.beans.step2') },
            { order: 3, description: this.translateService?.instant('dummy-recipes.recipes.beans.step3') }
          ],
          historyOfChanges: []
        }
      ]
    },
    // Add other recipes here as needed
  ];


  getNewRecipeId() {
    return 'r' + this.recipeId++;
  }

  getNewVariantId() {
    return 'v' + this.variantId++;
  }

}

