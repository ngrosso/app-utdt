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

  ngOnInit() {
  }

  seleccion(gradeId: number){
    this.gradeId = gradeId;
  } 

  @Input() curso: CalendarioComponent;

  
  submit(){
    this.curso.getCurso(this.gradeId)
  }
  

}
