import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcol } from './testcol';

describe('Testcol', () => {
  let component: Testcol;
  let fixture: ComponentFixture<Testcol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testcol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testcol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
