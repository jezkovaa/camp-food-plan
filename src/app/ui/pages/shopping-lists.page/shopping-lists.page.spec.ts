import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListsPage } from './shopping-lists.page';

describe('ShoppingListsPage', () => {
  let component: ShoppingListsPage;
  let fixture: ComponentFixture<ShoppingListsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
