import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todocol } from './todocol';

describe('Todocol', () => {
  let component: Todocol;
  let fixture: ComponentFixture<Todocol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todocol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Todocol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
