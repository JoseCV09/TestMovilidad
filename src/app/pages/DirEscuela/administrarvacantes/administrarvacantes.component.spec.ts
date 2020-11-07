import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarvacantesComponent } from './administrarvacantes.component';

describe('AdministrarvacantesComponent', () => {
  let component: AdministrarvacantesComponent;
  let fixture: ComponentFixture<AdministrarvacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarvacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarvacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
