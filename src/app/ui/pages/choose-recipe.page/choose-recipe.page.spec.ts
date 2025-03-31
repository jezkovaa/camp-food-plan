import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseRecipePage } from './choose-recipe.page';

describe('ChooseRecipePage', () => {
  let component: ChooseRecipePage;
  let fixture: ComponentFixture<ChooseRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
