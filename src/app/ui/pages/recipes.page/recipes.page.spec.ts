import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesPage } from './recipes.page';

describe('Tab1Page', () => {
  let component: RecipesPage;
  let fixture: ComponentFixture<RecipesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(RecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
