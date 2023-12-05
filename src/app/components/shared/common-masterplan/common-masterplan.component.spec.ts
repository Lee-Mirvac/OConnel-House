import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMasterplanComponent } from './common-masterplan.component';

describe('CommonMasterplanComponent', () => {
  let component: CommonMasterplanComponent;
  let fixture: ComponentFixture<CommonMasterplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonMasterplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonMasterplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
