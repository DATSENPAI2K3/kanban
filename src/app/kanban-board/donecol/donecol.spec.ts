import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donecol } from './donecol';

describe('Donecol', () => {
  let component: Donecol;
  let fixture: ComponentFixture<Donecol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donecol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donecol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
