import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundLevelComponent } from './ground-level.component';

describe('GroundLevelComponent', () => {
  let component: GroundLevelComponent;
  let fixture: ComponentFixture<GroundLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
