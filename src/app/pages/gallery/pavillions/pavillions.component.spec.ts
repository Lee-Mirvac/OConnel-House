import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PavillionsComponent } from './pavillions.component';

describe('PavillionsComponent', () => {
  let component: PavillionsComponent;
  let fixture: ComponentFixture<PavillionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PavillionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PavillionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
