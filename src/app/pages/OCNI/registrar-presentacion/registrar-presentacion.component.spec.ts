import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPresentacionComponent } from './registrar-presentacion.component';

describe('RegistrarPresentacionComponent', () => {
  let component: RegistrarPresentacionComponent;
  let fixture: ComponentFixture<RegistrarPresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
