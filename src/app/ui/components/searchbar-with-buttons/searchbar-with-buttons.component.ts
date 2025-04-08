import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  IonToolbar,
  IonButton,
  IonSearchbar,
  IonLabel,
  IonIcon,
  IonChip,
  IonPopover,
  PopoverController
} from '@ionic/angular/standalone';
import { RestrictionHelpComponent } from '../restriction-help/restriction-help.component';
import { RestrictionComponent } from '../restriction/restriction.component';
import { RecipesFilterComponent } from '../recipes-filter/recipes-filter.component';
import { IFilter } from 'src/app/data/interfaces/filter.interface';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { SortOptionsComponent } from '../sort-options/sort-options.component';
import { FoodRestriction } from 'src/app/data/enums/food-restriction.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SortOption } from 'src/app/data/enums/sort-options.enum';
import { FilterType } from 'src/app/data/enums/filter-type.enum';
import { cloneDeep } from 'lodash';
import { Course } from 'src/app/data/enums/courses.enum';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { add, closeCircle, help, options } from 'ionicons/icons';

@Component({
  selector: 'app-searchbar-with-buttons',
  templateUrl: './searchbar-with-buttons.component.html',
  styleUrls: ['./searchbar-with-buttons.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonButton,
    IonSearchbar,
    IonLabel,
    IonIcon,
    IonChip,

    RestrictionComponent,

    TranslateModule,
    CommonModule

  ]
})
export class SearchbarWithButtonsComponent implements OnInit {

  @Input({ required: true }) filter: IFilterOptions | null = null;
  @Input({ required: true }) searchValue = "";
  @Input({ required: true }) sortOption: SortOption = SortOption.NAME_ASC;
  @Input() isRecipesPage = true;

  @Output() searchValueChangedEvent = new EventEmitter<string>();
  @Output() filterChangedEvent = new EventEmitter<IFilterOptions>();
  @Output() sortOptionChangedEvent = new EventEmitter<SortOption>();

  @ViewChild("sortPopover") sortPopover!: IonPopover;
  @ViewChild("filterPopover") filterPopover!: IonPopover;

  appliedFilters: IFilter[] = [];

  constructor(private translateService: TranslateService,
    private popoverController: PopoverController) {

    addIcons({ add, options, help, closeCircle });

  }

  ngOnInit() { }

  async helpButtonClicked(event: any) {
    const popover = await this.popoverController.create({
      component: RestrictionHelpComponent,
      event: event,
      cssClass: 'restriction-help-popover',
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();
  }

  async filterButtonClicked(event: any) {
    const popover = await this.popoverController.create({
      component: RecipesFilterComponent,
      cssClass: 'filter-popover',
      event: event,
      translucent: true,
      backdropDismiss: true,
      componentProps: {
        filter: this.filter,
        isRecipesPage: this.isRecipesPage
      }
    });
    await popover.present();
  }

  async sortButtonClicked(event: any) {
    const popover = await this.popoverController.create({
      component: SortOptionsComponent,
      cssClass: 'sort-popover',
      event: event,
      translucent: true,
      backdropDismiss: true,
      componentProps: {
        sortOption: this.sortOption
      }
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data && data.optionChanged) {
      this.sortOptionChanged(data.optionChanged); // Call your method with the emitted value
    }
  }

  filterChanged(filter: IFilterOptions) {

    this.filter = filter;
    this.appliedFilters = [];
    if (this.filter) {
      if (this.filter.courses.length > 0) {
        this.filter.courses.forEach((course) => {
          this.appliedFilters.push({
            name: this.translateService.instant(`courses.${course}`),
            type: FilterType.COURSE,
            value: course
          });
        });
      }
      if (this.filter.restrictions.length > 0) {
        this.filter.restrictions.forEach((restriction) => {
          this.appliedFilters.push({
            name: this.translateService.instant(`food-restriction.${restriction}`),
            type: FilterType.FOOD_RESTRICTION,
            value: restriction
          });
        });
      }
    }
    this.filterChangedEvent.emit(this.filter);
    this.filterPopover.dismiss();

  }

  sortOptionChanged(option: SortOption) {
    this.sortOption = option;
    this.sortPopover.dismiss();
    this.sortOptionChangedEvent.emit(this.sortOption);
  }

  removeFilter(filter: IFilter) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    if (filter.type === FilterType.COURSE) {
      if (Object.values(Course).includes(filter.value as Course) && this.filter?.courses.includes(filter.value as Course)) {
        if (this.filter?.courses) {
          this.filter.courses = this.filter.courses.filter((_, i) => i !== this.filter!.courses!.indexOf(filter.value as Course));
          this.filter = cloneDeep(this.filter);
        }
      }
    } else if (Object.values(FoodRestriction).includes(filter.value as FoodRestriction) && this.filter?.restrictions.includes(filter.value as FoodRestriction)) {
      if (this.filter?.restrictions) {
        this.filter.restrictions = this.filter.restrictions.filter((_, i) => i !== this.filter!.restrictions!.indexOf(filter.value as FoodRestriction));
        this.filter = cloneDeep(this.filter);
      }
    }
    this.appliedFilters.splice(this.appliedFilters.indexOf(filter), 1);

    this.filter ? this.filterChangedEvent.emit(this.filter) : this.filterChangedEvent.emit({ courses: [], restrictions: [] });
  }

  getFilterValue(value: Course | FoodRestriction): FoodRestriction[] {
    if (Object.values(FoodRestriction).includes(value as FoodRestriction)) {
      return [value as FoodRestriction];
    }
    return [];
  }

  isFoodRestrictionFilter(type: FilterType): boolean {
    return type === FilterType.FOOD_RESTRICTION;
  }

}
