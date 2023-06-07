import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inferOnOff'
})
export class InferOnOffPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value === 1){
      return 'On'
    }
    else if (value === 0){
      return 'Off'
    }

  }

}
