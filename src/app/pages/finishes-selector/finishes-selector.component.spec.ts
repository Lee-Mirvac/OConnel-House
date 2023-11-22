import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishesSelectorComponent } from './finishes-selector.component';

describe('FinishesSelectorComponent', () => {
  let component: FinishesSelectorComponent;
  let fixture: ComponentFixture<FinishesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
