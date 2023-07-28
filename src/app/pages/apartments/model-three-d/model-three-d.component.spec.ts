import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelThreeDComponent } from './model-three-d.component';

describe('ModelThreeDComponent', () => {
  let component: ModelThreeDComponent;
  let fixture: ComponentFixture<ModelThreeDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelThreeDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelThreeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
