import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrum } from './scrum';

describe('Scrum', () => {
  let component: Scrum;
  let fixture: ComponentFixture<Scrum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
