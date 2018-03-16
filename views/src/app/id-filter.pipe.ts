import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFilter'
})
export class IdFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substring(value.length-7 , value.length);
  }

}
