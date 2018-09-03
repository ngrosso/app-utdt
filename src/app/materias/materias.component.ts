import { Component, OnInit } from '@angular/core';
import { Materia } from '../materia';
import { MateriaService } from '../materia.service';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

	duration: string;
	materias: Materia[];
	selectedMateria: Materia;

  	constructor(private materiaService: MateriaService) {
  	}

	ngOnInit() {
		this.getAllMaterias()
		this.duration = '0'; //setea el buscador en 0
		
	}

	//trae todas las materias del JSON que corresponda
	getAllMaterias(): void{
		this.materiaService.getMaterias()
			.subscribe(materias => {
				this.materias = materias;
				this.announce(this.materias[0]);
			})
	}

	//broadcastea la materia seleccionada
	announce(materia: Materia){
		this.materiaService.materiaBroadcast(materia);
		this.selectedMateria = materia;
	}


 }