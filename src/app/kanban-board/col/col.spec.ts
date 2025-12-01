import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Col } from './col';

describe('Col', () => {
  let component: Col;
  let fixture: ComponentFixture<Col>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Col]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Col);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
