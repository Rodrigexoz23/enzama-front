import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clientas } from './clientas';

describe('Clientas', () => {
  let component: Clientas;
  let fixture: ComponentFixture<Clientas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clientas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clientas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
