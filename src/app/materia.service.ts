import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { Materia } from './materia';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

	private materiasUrl = 'api/Materias';  // URL to web api

	//trae el array mock como observable
	getMaterias(): Observable<Materia[]>{
		return this.http.get<Materia[]>(this.materiasUrl)
	}


	constructor(
		private http: HttpClient
		){ }

	//Observable string sources
	private materiaBroadcastSource = new Subject<Materia>();

	//observable String streams
	materiaBroadcast$ = this.materiaBroadcastSource.asObservable();

	//service commands
	materiaBroadcast(materia: Materia){
		this.materiaBroadcastSource.next(materia);
	}


}
