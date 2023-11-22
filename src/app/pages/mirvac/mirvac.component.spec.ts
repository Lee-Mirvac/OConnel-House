import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirvacComponent } from './mirvac.component';

describe('MirvacComponent', () => {
  let component: MirvacComponent;
  let fixture: ComponentFixture<MirvacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirvacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MirvacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
