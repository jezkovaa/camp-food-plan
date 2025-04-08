import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { RecipeVariantComponent } from "../recipe-variant/recipe-variant.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { IRecipeVariant } from 'src/app/data/interfaces/recipe-variant.interface';
import { IFilterOptions } from 'src/app/data/interfaces/filter-options.interface';
import { SortOption } from 'src/app/data/enums/sort-options.enum';

@Component({
  selector: 'app-variants-list',
  templateUrl: './variants-list.component.html',
  styleUrls: ['./variants-list.component.scss'],
  imports: [IonList, RecipeVariantComponent, CommonModule],
  standalone: true
})
export class VariantsListComponent implements OnInit, OnChanges {

  @Input({ required: true }) variants: IRecipeVariant[] = [];
  @Input() isEditing = false;
  @Input() isChoosing = false;

  @Input() searchValue = '';
  @Input() filter: IFilterOptions | null = null;
  @Input() sortOption: SortOption = SortOption.NAME_ASC;


  @Output() selectedCountChanged = new EventEmitter<string[]>();

  filteredVariants: IRecipeVariant[] = [];
  selectedIds: string[] = [];

  constructor() { }

  ngOnInit() {
    this.filteredVariants = [...this.variants];
    this.applySearchValue();
    this.filterVariants();
    this.sortVariants();
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let propName in changes) {
      if (propName === 'recipes') {
        this.filteredVariants = [...this.variants];
      }

    }
    this.filteredVariants = [...this.variants];
    this.applySearchValue();
    this.filterVariants();
    this.sortVariants();
  }

  selectionChanged(e: any) {
    if (e.selected && !this.selectedIds.includes(e.id)) {
      this.selectedIds.push(e.id);
    }
    else if (!e.selected && this.selectedIds.includes(e.id)) {
      this.selectedIds = this.selectedIds.filter(id => id !== e.id);
    }
    this.selectedCountChanged.emit(this.selectedIds);
  }

  private applySearchValue() {
    this.filteredVariants = this.filteredVariants.filter(variant => variant.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

  private filterVariants() {
    this.filteredVariants = this.filteredVariants.filter(variant => {
      return this.variantHasRestrictionWhichIsInFilter(variant);
    });
  }

  private sortVariants() {
    switch (this.sortOption) {
      case SortOption.NAME_ASC:
        this.filteredVariants.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOption.NAME_DESC:
        this.filteredVariants.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  private variantHasRestrictionWhichIsInFilter(variant: IRecipeVariant): boolean {
    if (!this.filter || !this.filter.restrictions) {
      return true;
    }
    if (this.filter.restrictions.length === 0) {
      return true;
    }
    return variant.restrictions.some(restriction => this.filter && this.filter.restrictions && this.filter.restrictions.includes(restriction));
  }
}
