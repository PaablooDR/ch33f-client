import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedRecipesPage } from './savedrecipes.page';

describe('SavedRecipesPage', () => {
  let component: SavedRecipesPage;
  let fixture: ComponentFixture<SavedRecipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
