import { Pipe, PipeTransform } from '@angular/core';
import { Materia } from './materia'

@Pipe({
  name: 'inputFilter',
  pure: false
})
export class InputFilterPipe implements PipeTransform {

  transform(value: Materia[], input: string): Materia[] {
  	if(!value || !input) return value;
  	let aux = [];
  	for(let materia of value){
    	if(materia.name.toLowerCase().indexOf(input.toLowerCase())!= -1){
    		aux.push(materia)
    	}
  	}
  	return aux;  
  }

}
