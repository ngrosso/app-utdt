import { Component, OnInit, HostListener, Input } from '@angular/core';
import { HorariosComponent } from '../horarios/horarios.component'
import { CalendarioComponent } from '../calendario/calendario.component';
import { Alert } from './alert'
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
  alert: Alert;

  constructor(private materiaService: MateriaService) {
    this.subscription = materiaService.materiaBroadcast$.subscribe(
      materia =>{
        this.materia = materia;
        this.gradeList = materia.gradeList;
        this.gradeId = null;
        this.alert = new Alert();
      })}

  ngOnInit() {
  }

  seleccion(gradeId: number){
    this.gradeId = gradeId;
  } 

  @Input() curso: CalendarioComponent;

  
  submit(){
    this.alert= new Alert();
    try {
      this.curso.getCurso(this.gradeId)
    }catch(exception){
      this.alert = exception;
      
    }
  }
  

}
