import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === "" || arg.length < 2) return value;
    const resultPost = [];
    for (const convocatoria of value) {
      if (
        convocatoria.nombre_escuela.toLowerCase().indexOf(arg.toLowerCase()) >
        -1
      ) {
        resultPost.push(convocatoria);
      }
    }
    return resultPost;
  }
}
