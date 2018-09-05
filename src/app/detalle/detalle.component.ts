import { Component, OnInit, Input } from '@angular/core';
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
  selectedGradeId: number;

  //el detalle se suscribe a MateriaService, ante una nueva seleccion, trae los cursos de dicha materia
  constructor(private materiaService: MateriaService) {
    this.subscription = materiaService.materiaBroadcast$.subscribe(
      materia =>{
        this.materia = materia;
        this.gradeList = materia.gradeList;
        this.gradeId = null;
        this.selectedGradeId = null;
        this.alert = new Alert();
      })}

  ngOnInit() {
  }

  //evento bindeado en el html
  //elije un curso y pasa el id
  seleccion(gradeId: number){
    this.alert = new Alert();
    this.gradeId = gradeId;
    this.selectedGradeId = gradeId;
  } 

  //linkeo el metodo de CalendarioComponent al submit de DetalleComponent para que valide
  @Input() curso: CalendarioComponent;

  //refreshea el cartel de error y si es satisfactorio, 
  submit() {
    this.selectedGradeId=-1;
    this.alert = new Alert();
    try {
      this.curso.getCurso(this.gradeId);
    } catch (exception) {
      this.alert = exception;
    }
  }
}
