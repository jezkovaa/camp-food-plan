import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { TranslateService } from '@ngx-translate/core';
import { SortOption } from 'src/app/data/enums/sort-options.enum';

@Component({
  selector: 'app-sort-options',
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,

    CommonModule]
})
export class SortOptionsComponent implements OnInit {

  options = Object.values(SortOption);

  @Output() optionChanged = new EventEmitter<SortOption>();

  constructor(private translateService: TranslateService) { }

  ngOnInit() { }

  getOptionName(option: SortOption): string {
    return this.translateService.instant(`sort-options.${option}`);
  }

  getIcon(option: SortOption): string {
    switch (option) {
      case SortOption.NAME_ASC:
        return "assets/icon/sort-az.svg";
      case SortOption.NAME_DESC:
        return "assets/icon/sort-za.svg";
      default:
        return "";
    }
  }

  selectOption(option: SortOption) {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur();
    this.optionChanged.emit(option);
  }
}
