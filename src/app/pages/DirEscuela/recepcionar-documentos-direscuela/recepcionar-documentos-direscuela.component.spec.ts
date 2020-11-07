import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionarDocumentosDirescuelaComponent } from './recepcionar-documentos-direscuela.component';

describe('RecepcionarDocumentosDirescuelaComponent', () => {
  let component: RecepcionarDocumentosDirescuelaComponent;
  let fixture: ComponentFixture<RecepcionarDocumentosDirescuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionarDocumentosDirescuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionarDocumentosDirescuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
