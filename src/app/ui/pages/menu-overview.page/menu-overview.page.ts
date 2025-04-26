import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { DayMenuOverviewComponent } from "../../components/day-menu-overview/day-menu-overview.component";
import { IDayMeal, IDayMealRecipe, IDayMealRecipeVariant, IDayMenu } from 'src/app/data/interfaces/day-menu.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ID } from 'src/app/types';
import { IPlannedEvent } from 'src/app/data/interfaces/planned-event.interface';
import { isBefore, isSameDay } from 'date-fns';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { RecipeService } from 'src/app/data/services/recipe.service';
import { VariantService } from 'src/app/data/services/variant.service';
import { PlannedEventService } from 'src/app/data/services/planned-event.service';
import { IDayMealExtended, IDayMealRecipeExtended, IDayMealRecipeVariantExtended, IPlannedEventExtended } from 'src/app/data/interfaces/planned-event-extended.interface';
import { finalize, lastValueFrom } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Directory, Filesystem } from '@capacitor/filesystem';

import { Platform } from '@ionic/angular';
(<any>pdfMake).addVirtualFileSystem(pdfFonts);


@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.page.html',
  styleUrls: ['./menu-overview.page.scss'],
  standalone: true,
  imports: [IonButton, IonBackButton, IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    CommonModule,
    FormsModule,
    TranslateModule,
    DayMenuOverviewComponent],
  providers: [FileOpener]
})
export class MenuOverviewPage implements OnInit {

  event: IPlannedEvent | null = null;
  dates: Date[] = [];

  constructor(private route: ActivatedRoute,
    private plannedEventService: PlannedEventService,
    private translateService: TranslateService,
    private recipesService: RecipeService,
    private variantService: VariantService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private router: Router,
    private plt: Platform,
    private fileOpener: FileOpener) { }

  ngOnInit() {

    this.route.params.subscribe(async params => {
      let eventId = params['eventId'];
      if (eventId === null) {
        return;
      }
      const loading = await this.loadingService.showLoading();
      await loading.present();;
      this.plannedEventService.getById(eventId).pipe(
        finalize(() => loading.dismiss())
      ).subscribe({
        next: (event: IPlannedEvent) => {
          this.event = event;
          if (event.dateFrom && event.dateTo) {
            this.dates = this.datesInRange(event.dateFrom, event.dateTo);
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    });
  }

  datesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);

    while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  getMenuForDate(date: Date): IDayMenu | null {
    if (this.event?.menu) {
      const menu = this.event.menu.find((menu: IDayMenu) => {
        if (menu.date) {
          const menuDate = new Date(menu.date);
          return isSameDay(menuDate, date);
        }
        return null;
      });
      return menu || null;
    }
    return null;
  }


  async getPDF() {
    //todo
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (this.event === null || this.event.dateFrom === null || this.event.dateTo === null) {
      console.error('Event or date range is not defined.');
      return;
    }

    let continueWithPdf = false;
    if (!this.menuIsComplete()) {
      const alert = await this.alertService.presentConfirm(
        this.translateService.instant('planning.event.menu-not-complete.title'),
        this.translateService.instant('planning.event.menu-not-complete.message'),
        () => {
          continueWithPdf = true;
        });
      await alert.present();
      await alert.onDidDismiss();
      if (!continueWithPdf) {
        return;
      }

    }


    const content = await this.getPdfContent(this.event, this.event.dateFrom, this.event.dateTo);

    // Define the document structure
    const docDefinition = {
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10] as [number, number, number, number],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] as [number, number, number, number],
        },
        menuDate: {
          fontSize: 12,
          italics: true,
          margin: [0, 5, 0, 5] as [number, number, number, number],
        },
      },
    };

    // Generate the PDF
    const pdfObj = pdfMake.createPdf(docDefinition);


    if (this.plt.is('cordova')) {
      pdfObj.getBase64(async (base64: string) => {
        try {
          let path = 'demopdfs/demoionic5pdf.pdf';
          const result = await Filesystem.writeFile({
            path,
            data: base64,
            directory: Directory.Documents,
            recursive: true
          });
          this.fileOpener.open(result.uri, 'application/pdf');
        } catch (error) {
          console.error('Error writing file:', error);
        }
      });

    } else {
      pdfObj.download('menu.pdf');
    }
  }

  navigateToDayMenu(menu: IDayMenu) {
    if (this.event === null) {
      return;
    }
    this.router.navigate(['/tabs/planning/events', this.event.id, "menu", menu.id]);
  }

  private async getPdfContent(event: IPlannedEvent, dateFrom: Date, dateTo: Date) {
    const content = [];

    let data: IPlannedEventExtended = {
      id: event.id,
      name: event.name,
      dateFrom: dateFrom,
      dateTo: dateTo,
      participants: [],
      menu: []
    };

    data.menu = await Promise.all(event.menu.map(async (menu: IDayMenu) => {
      return {
        id: menu.id,
        date: menu.date,
        meals: await this.mapMeals(menu.meals),
      };
    }));

    // Add event details
    content.push(
      { text: `${this.translateService.instant('planning.event.menu')} ${data.name}`, style: 'header' },
      { text: `${this.translateService.instant('planning.event.date')}: ${data.dateFrom.toLocaleDateString()} - ${data.dateTo.toLocaleDateString()}`, style: 'subheader' },
    );

    // Add menu details
    content.push({ text: 'Menu:', style: 'header-2' });

    data.menu.forEach((menu) => {
      content.push(
        { text: `${this.translateService.instant('planning.event.date')}: ${menu.date.toLocaleDateString()}`, style: 'menuDate' },
      );

      // Add a separator for better visibility of the date
      if (menu.meals.length === 0) {
        content.push(
          { text: this.translateService.instant('planning.day-menu.no-meals'), italics: true },
          { text: '----------------------------------------', alignment: 'center', margin: [0, 10, 0, 10] as [number, number, number, number] }
        );
      } else {
        menu.meals.forEach((meal) => {
          if (meal.chosenRecipes.length === 0) {
            content.push(
              { text: this.translateService.instant('planning.day-menu.no-meals'), italics: true },
              { text: '\n' } // Add new line after each meal
            );
          } else {
            content.push(
              { text: `${this.translateService.instant('recipes.recipe-detail.course')}: ${this.translateService.instant(`courses.${meal.course}`)}`, bold: true },
              {
                text: `${this.translateService.instant('recipes.recipe')}: ${meal.chosenRecipes
                  .map((recipe) => this.translateService.instant(`${recipe.recipeName}`))
                  .join(', ')}`
              },
              {
                ul: meal.chosenRecipes
                  .flatMap((recipe) =>
                    recipe.variants.map(
                      (variant) =>
                        `${variant.variantName}, ${this.translateService.instant('planning.day-menu.portions.title')}: ${variant.portions}, ${this.translateService.instant('food-restriction.available-for')}: ${Array.from(variant.restrictions)
                          .map((restriction) => restriction.toLocaleLowerCase())
                          .join(', ')}`
                    )
                  )
              },
              { text: '\n' } // Add new line after each meal
            );
          }
        });

        // Add a separator for better visibility of the date
        content.push(
          { text: '----------------------------------------', alignment: 'center', margin: [0, 10, 0, 10] as [number, number, number, number] }
        );
      }

    });
    return content;
  }

  private menuIsComplete(): boolean {
    if (!this.event?.menu) {
      return false;
    }
    for (const menu of this.event.menu) {
      if (menu.meals.length !== 5) {
        return false;
      }
    }
    return true;
  }


  private async mapMeals(meals: IDayMeal[]): Promise<IDayMealExtended[]> {
    return Promise.all(
      meals.map(async (meal: IDayMeal) => {
        return {
          id: meal.id,
          course: meal.course,
          chosenRecipes: await this.mapRecipes(meal.chosenRecipes),
        };
      })
    );
  }

  private async mapRecipes(recipes: IDayMealRecipe[]): Promise<IDayMealRecipeExtended[]> {
    const mappedRecipes = await Promise.all(
      recipes.map(async (recipe: IDayMealRecipe) => {
        const fetchedRecipe = await firstValueFrom(this.recipesService.getById(recipe.recipeId));
        if (fetchedRecipe === null) {
          console.error(`Recipe with ID ${recipe.recipeId} not found`);
          return null; // or handle the error as needed
        } else {
          return {
            recipeId: recipe.recipeId,
            recipeName: fetchedRecipe.name,
            variants: await this.mapVariants(recipe.recipeId, recipe.variants),
          };
        }
      })
    );

    return mappedRecipes.filter((recipe): recipe is IDayMealRecipeExtended => recipe !== null);
  }


  private async mapVariants(recipeId: ID, variants: IDayMealRecipeVariant[]): Promise<IDayMealRecipeVariantExtended[]> {
    const variantsWithDetails = await Promise.all(
      variants.map(async (variant) => {
        try {
          const fetchedVariant = await lastValueFrom(this.variantService.getById(variant.variantId));
          if (fetchedVariant === null) {
            console.error(`Variant with ID ${variant.variantId} not found for recipe ID ${recipeId}`);
            return null; // or handle the error as needed
          }
          return {
            variantId: variant.variantId,
            variantName: fetchedVariant.name,
            portions: variant.portions,
            restrictions: fetchedVariant.restrictions,
          };
        } catch (error) {
          console.error(error);
          throw error; // Optionally rethrow the error if needed
        }
      })
    );
    return variantsWithDetails.filter((variant): variant is IDayMealRecipeVariantExtended => variant !== null);
  }

}
