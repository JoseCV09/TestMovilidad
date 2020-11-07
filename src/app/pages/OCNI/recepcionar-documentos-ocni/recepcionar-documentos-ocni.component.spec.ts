import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RecepcionarDocumentosOcniComponent } from "./recepcionar-documentos-ocni.component";

describe("RecepcionarDocumentosOcniComponent", () => {
  let component: RecepcionarDocumentosOcniComponent;
  let fixture: ComponentFixture<RecepcionarDocumentosOcniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecepcionarDocumentosOcniComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionarDocumentosOcniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
