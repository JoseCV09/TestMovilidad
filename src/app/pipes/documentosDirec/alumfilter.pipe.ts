import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumfilter'
})
export class AlumfilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    console.log('la peda');
    console.log(arg);
    console.log(typeof(arg));
    if (arg === "" ) return value;
    const resultPost = [];
    for (const alumno of value) {
      console.log('la peda');
      console.log(typeof(alumno));
      console.log(alumno);
      if (
        alumno.indexOf(arg.toLowerCase()) >
        -1
      ) {
        resultPost.push(alumno);
      }
    }
    return resultPost;
  }

}


