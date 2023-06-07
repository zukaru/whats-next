import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inferTrueFalse'
})
export class InferTrueFalsePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): boolean {
    if(value === 0){
      return false
    }
    else if (value === 1){
      return true
    }

  }

}
