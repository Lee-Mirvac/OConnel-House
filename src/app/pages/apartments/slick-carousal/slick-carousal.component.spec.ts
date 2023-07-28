import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickCarousalComponent } from './slick-carousal.component';

describe('SlickCarousalComponent', () => {
  let component: SlickCarousalComponent;
  let fixture: ComponentFixture<SlickCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlickCarousalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
