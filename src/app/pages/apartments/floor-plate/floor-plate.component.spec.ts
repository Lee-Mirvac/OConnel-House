import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlateComponent } from './floor-plate.component';

describe('FloorPlateComponent', () => {
  let component: FloorPlateComponent;
  let fixture: ComponentFixture<FloorPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorPlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
