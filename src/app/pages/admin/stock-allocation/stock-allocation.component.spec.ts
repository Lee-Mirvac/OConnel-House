import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAllocationComponent } from './stock-allocation.component';

describe('StockAllocationComponent', () => {
  let component: StockAllocationComponent;
  let fixture: ComponentFixture<StockAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
