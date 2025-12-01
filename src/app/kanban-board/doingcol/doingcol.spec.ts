import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doingcol } from './doingcol';

describe('Doingcol', () => {
  let component: Doingcol;
  let fixture: ComponentFixture<Doingcol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doingcol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Doingcol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
