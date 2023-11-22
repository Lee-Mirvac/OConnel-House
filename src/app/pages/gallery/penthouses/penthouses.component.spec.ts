import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenthousesComponent } from './penthouses.component';

describe('PenthousesComponent', () => {
  let component: PenthousesComponent;
  let fixture: ComponentFixture<PenthousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenthousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenthousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
