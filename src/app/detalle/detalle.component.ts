import { Component, OnInit, HostListener, Input } from '@angular/core';
import { HorariosComponent } from '../horarios/horarios.component'
import { CalendarioComponent } from '../calendario/calendario.component';
import { Materia } from '../materia';
import { Grade } from '../grade';
import { MateriaService } from '../materia.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

	materia: Materia;
  gradeId: number;
  gradeList: Grade[];
  subscription: Subscription;

  constructor(private materiaService: MateriaService) { 
    this.subscription = materiaService.materiaBroadcast$.subscribe(
      materia =>{
        this.materia = materia;
        this.gradeList = materia.gradeList;
      })}

  ngOnInit() {/*
  	this.materiaService.broadcastMateria.subscribe(materia =>{
  		this.materia = materia;
        console.log("desde detalle "+JSON.stringify(this.materia));
  	});*/
  }

  seleccion(gradeId: number){
    console.log("curso elegido de la tabla: "+gradeId)
    this.gradeId = gradeId;
  } 

  @Input() curso: CalendarioComponent;

  
  submit(){
    console.log("submit materia "+JSON.stringify(this.materia))
    console.log("submit gradeList "+JSON.stringify(this.gradeList))
    console.log("submit gradeId "+this.gradeId)
    this.curso.getCurso(this.gradeId)
  }
  

}
