import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCocktailComponent } from './create-edit-cocktail.component';

describe('CreateEditCocktailComponent', () => {
  let component: CreateEditCocktailComponent;
  let fixture: ComponentFixture<CreateEditCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCocktailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
