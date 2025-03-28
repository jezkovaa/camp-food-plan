import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayMenuPage } from './day-menu.page';

describe('DayMenuPage', () => {
  let component: DayMenuPage;
  let fixture: ComponentFixture<DayMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
