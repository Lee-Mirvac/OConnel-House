import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastStagesComponent } from './past-stages.component';

describe('PastStagesComponent', () => {
  let component: PastStagesComponent;
  let fixture: ComponentFixture<PastStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastStagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
