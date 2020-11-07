import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "documentosOcni",
})
export class DocumentosOcniPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === "" || arg.length < 2) return value;
    const resultPost = [];
    for (const documentos of value) {
      if (documentos.nombre_persona.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(documentos);
      }
    }
    return resultPost;
  }
}
