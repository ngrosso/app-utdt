import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  	constructor(private materiaService: MateriaService) {
  	}

	ngOnInit() {
		this.getAllMaterias()
		this.duration = '0';
		
	}

	getAllMaterias(): void{
		this.materiaService.getMaterias()
			.subscribe(materias => {
				this.materias = materias;
				this.announce(this.materias[0]);
			})
	}
	announce(materia: Materia){
		this.materiaService.materiaBroadcast(materia);
	}


 }