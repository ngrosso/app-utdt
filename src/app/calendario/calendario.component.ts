import { Component, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

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
	materiaId: number;
	gradeList: Grade[];
	calendarList = [];
	materiaCalendar: string;


  constructor(private materiaService: MateriaService) { 
    this.subscription = materiaService.materiaBroadcast$.subscribe(
      materia =>{
        this.materia = materia;
        this.gradeList = materia.gradeList;
      })}

  ngOnInit() {
  }

  //@HostBinding('class.active')


  getCurso(gradeId: number){
  	console.log("get curso: id "+gradeId)
  	console.log("get curso: Materia: "+JSON.stringify(this.materia));
  	console.log("get curso: GradeList: "+JSON.stringify(this.gradeList));
  	this.materiaCalendar = this.materia.name;
  	for (let index in this.gradeList) {
  	 	if(this.gradeList[index].id === gradeId){
  			console.log("get curso: curso"+JSON.stringify(this.gradeList[index]))

  	 		this.calendarList.push([this.materia.name,this.gradeList[index]]);
  	 		console.log(JSON.stringify(this.calendarList));
  	 	}
  	}
  }
}
