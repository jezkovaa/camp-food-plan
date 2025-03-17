import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonList } from "@ionic/angular/standalone";
import { RecipeVariantComponent } from "../recipe-variant/recipe-variant.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RecipeVariant } from 'src/app/recipes/data/interfaces/recipe-variant.interface';

@Component({
  selector: 'app-variants-list',
  templateUrl: './variants-list.component.html',
  styleUrls: ['./variants-list.component.scss'],
  imports: [IonList, RecipeVariantComponent, CommonModule],
  standalone: true
})
export class VariantsListComponent implements OnInit {

  @Input({ required: true }) variants: RecipeVariant[] = [];
  @Input() isEditing = false;
  @Output() selectedCountChanged = new EventEmitter<number[]>();


  selectedIds: number[] = [];

  constructor() { }

  ngOnInit() { }

  selectionChanged(e: any) {
    if (e.selected && !this.selectedIds.includes(e.id)) {
      this.selectedIds.push(e.id);
    }
    else if (!e.selected && this.selectedIds.includes(e.id)) {
      this.selectedIds = this.selectedIds.filter(id => id !== e.id);
    }
    this.selectedCountChanged.emit(this.selectedIds);
  }
}
