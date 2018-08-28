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
      })}

  ngOnInit() {
  }

  delete(grade:any){
    var index = this.calendarList.indexOf(grade, 0);
    if (index > -1) this.calendarList.splice(index, 1);
  }

  parseDay(day: string){
    switch(day.substring(0,3).toLowerCase()){
      case 'lun': return 0;
      case 'mar': return 1;
      case 'mie': return 2;
      case 'jue': return 3;
      case 'vie': return 4;
      case 'sab': return 5;
      default: throw "ParseDay Error";
    }
  }

  getCurso(gradeId: number){
    this.valido = true;
  	for (let index in this.gradeList) {
      //busco el curso particular en la lista de la materia
  	 	if(this.gradeList[index].id === gradeId){
        //===========arrancan las validaciones==============
         this.calendarList.forEach(item =>{
        //1)valido que no se repita la materia o el curso
          if(item.id == this.materia.id){ 
            console.error("Materia ya ingresada")
            this.valido=false;
          }//fin validacion 1)

         //2) si se pisa el dia, me fijo el ultimo horario del guardado y el primero del traido
          if(item.grade.days.includes(this.gradeList[index].days)||this.gradeList[index].days.includes(item.grade.days)){
              var startNew = item.grade.hours[0];
              var endNew = item.grade.hours[item.grade.hours.length-1]
              var startSaved = this.gradeList[index].hours[0]
              var endSaved = this.gradeList[index].hours[this.gradeList[index].hours.length-1]
            if((startNew<=endSaved || startSaved>=endNew)&&((startNew<=startSaved && endNew>=endSaved))||(startNew>=startSaved && endNew<=endSaved)){ //todo cuando las horas estan metidas dentro de la ya seleccionada y viceversa ej: new 1 a 6 saved 2 a 4e
              console.error("la materia igresada esta dentro de una franja horaria de una ya guardada")
              this.valido = false;
            } 
          }//fin validacion 2)
        }) 
         //===========fin validaciones==============
         //si todo es valido, pusheo el item
  	 		if(this.valido){
           this.calendarList.push({"id":this.materia.id,"name":this.materia.name,"grade":this.gradeList[index]});
           //fijarse bien la documentacion de ngclass y la edicion del clases desde el ts como directive
        }else{
           console.error("Informacion Invalida")
        }
  	 	}
  	}
  }
}
