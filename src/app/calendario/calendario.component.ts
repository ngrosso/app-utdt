import { Component, OnInit, HostBinding } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { MateriaService } from '../materia.service';
import { Materia } from '../materia';
import { Grade } from '../grade';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

	subscription: Subscription;
	materia: Materia;
	gradeList: Grade[];
	calendarList = [];
  infoMateria: Materia;
  valido: boolean;
  activeCalendar: boolean;
  tableMatrix= [];


  constructor(private materiaService: MateriaService) { 
    this.subscription = materiaService.materiaBroadcast$.subscribe(
      materia =>{
        this.materia = materia;
        this.gradeList = materia.gradeList;
        this.valido = true;
      })}

  ngOnInit() {
  }

  delete(grade:any){
    var index = this.calendarList.indexOf(grade, 0);
    if (index > -1) this.calendarList.splice(index, 1);
    console.log(JSON.stringify(grade));
    console.log(JSON.stringify(this.calendarList)) 
  }

  getCurso(gradeId: number){
    this.valido = true;
  	for (let index in this.gradeList) {
      //busco el curso particular en la lista de la materia
  	 	if(this.gradeList[index].id === gradeId){
        //===========arrancan las validaciones==============
        //1)valido que no se repita la materia o el curso
         this.calendarList.forEach(item =>{

          if(item.id == this.materia.id){ 
            console.error("Materia ya ingresada")
            this.valido=false;
          }//fin validacion 1)


         //2) si se pisa el dia, me fijo el ultimo horario del guardado y el primero del traido
          if(item.grade.days.includes(this.gradeList[index].days)||this.gradeList[index].days.includes(item.grade.days)){
            if(item.grade.hours[0]<=this.gradeList[index].hours[this.gradeList[index].hours.length-1] || this.gradeList[index].hours[0]>=item.grade.hours[item.grade.hours.length-1]){
              console.error("la materia ingresada esta dentro de una franja horaria de una ya ingresada")
              this.valido = false;
            } 
          }//fin validacion 2
        }) 
         //===========fin validaciones==============
         //si todo es valido, pusheo el item
  	 		if(this.valido){
           this.calendarList.push({"id":this.materia.id,"name":this.materia.name,"grade":this.gradeList[index]});
        }else{
           console.error("Informacion Invalida")
        }
  	 	}
  	}
  }
}
