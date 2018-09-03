import { Component, HostBinding, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


import { MateriaService } from '../materia.service';
import { Materia } from '../materia';
import { Grade } from '../grade';
import { Alert } from '../detalle/alert'

const CURSOMANIANA = 'm'
const CURSOTARDE = 't'
const CURSONOCHE = 'n'

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
    

    //subscribe al componente a los cambios que haya en el servicio MateriaService
    //recibe la materia broadcasteada por materias.component y su lista de cursos
    constructor(private materiaService: MateriaService,private _sanitizer: DomSanitizer) { 
        this.subscription = materiaService.materiaBroadcast$.subscribe(
            materia =>{
                this.materia = materia;
                this.gradeList = materia.gradeList;
            }
        )
    }

    ngOnInit() {
    }

    // borra una materia
    delete(grade:any){
        var index = this.calendarList.indexOf(grade, 0);
        if (index > -1) { this.calendarList.splice(index, 1); }
    }

    // pasa del dia al numero de columna que le corresponde en el calendario
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


    // Recorre dos listas para verificar si hay elementos en comun entre ellas
    // Devuelve true si hay elementos repetidos
    isRepeated(haystack:string[], arr:string[]) {
            return arr.some(function (v) {
                    return haystack.indexOf(v) >= 0;
            });
    };

    unCurso(materia:any){
        //console.log(materia)
        switch (materia.grade.days.substring(4,5).toLowerCase()){
            case CURSOMANIANA: return "red";
            case CURSOTARDE: return "green";
            case CURSONOCHE: return "blue";
            default: return "coral";
        }
        
    }

    dosCursos(materiaArr:any[]){
        let turnos: string = "";
        for(let materia of materiaArr){
            turnos+=(materia.grade.days.substring(4,5).toLowerCase())
        }
        if(turnos.includes(CURSOMANIANA) && turnos.includes(CURSOTARDE))
            return this._sanitizer.bypassSecurityTrustStyle('linear-gradient(to right, red 0, red 50%, green 50%, green 100%');
        if(turnos.includes(CURSOTARDE) && turnos.includes(CURSONOCHE)) 
            return this._sanitizer.bypassSecurityTrustStyle('linear-gradient(to right, green 0, green 50%, blue 50%, blue 100%');
        if(turnos.includes(CURSOMANIANA) && turnos.includes(CURSONOCHE))
            return this._sanitizer.bypassSecurityTrustStyle('linear-gradient(to right, red 0, red 50%, blue 50%, blue 100%');
    }

    tresCursos(materiaArr:any[]){
        let turnos: string = "";
        for(let materia of materiaArr){
            turnos+=(materia.grade.days.substring(4,5).toLowerCase())
        }
        if(turnos.includes(CURSOMANIANA) && turnos.includes(CURSOTARDE) && turnos.includes(CURSONOCHE))
            return this._sanitizer.bypassSecurityTrustStyle('linear-gradient(to right, red 0, red 33%, green 33%, green 66%, blue 66%, blue 100%)');
    }

    // Le agrega la clase "selected" a las celdas que cumplan con la condicion de estar en el array de horas de materias asignadas
    // Tambien borra les quita la clase "selected" a las que no esten en el array
     setCalendar(i:number,j:number){
        let aux = [];
        for(let materia of this.calendarList){
            let daysArray = materia.grade.days.split(",").map(str=>str.trim());
            for(let day of daysArray){
                if((i>=Number(materia.grade.hours[0]-1) && i<= Number(materia.grade.hours[materia.grade.hours.length-1]-1)) && j == this.parseDay(day)){
                    aux.push(materia)
                    break;
                }
            }
        }
        switch(aux.length){
            case 0: break;
            case 1: return this.unCurso(aux[0]);
            case 2: return this.dosCursos(aux);
            case 3: return this.tresCursos(aux);
            default: throw new Alert(true,"Error","No se pudo generar los gradientes","alert-info");
        }   //return {background:"red"};
    }


    // metodo de validacion y agregado de cursos al calendario
    //recibe el id del curso seleccionado y agrega al calendarList un objeto con la materia y su curso correspondiente
    getCurso(gradeId: number){
        //0) valido que llegue un curso
        if(gradeId === null) throw new Alert(true,"Atencion"," Ningun curso ha sido seleccionado.","alert-warning"); //fin validacion 0)
        for (let index in this.gradeList) {
            //busco el curso particular en la lista de la materia
            if(this.gradeList[index].id === gradeId){
                //===========arrancan las validaciones==============
                this.calendarList.forEach(item =>{
                    //1)valido que no se repita la materia o el curso
                    if(item.id == this.materia.id) throw new Alert(true,"Error"," Materia ya ingresada.","alert-danger");//fin validacion 1)
                    let newDayArray=item.grade.days.split(",").map(str=>str.trim());
                    let savedDayArray=this.gradeList[index].days.split(",").map(str=>str.trim());

                    //================================================================================
                    //TODO: Fijarse el turno
                    //================================================================================

                    //2) si se pisa el dia, me fijo el ultimo horario del guardado y el primero del traido
                    if(this.isRepeated(newDayArray,savedDayArray)){
                            var startNew = item.grade.hours[0];
                            var endNew = item.grade.hours[item.grade.hours.length-1]
                            var startSaved = this.gradeList[index].hours[0]
                            var endSaved = this.gradeList[index].hours[this.gradeList[index].hours.length-1]
                            if((startNew<endSaved || startSaved>endNew)&&(startNew<startSaved || endNew>endSaved)||(startNew>=startSaved && endNew<=endSaved)){
                                this.valido = false;
                                throw new Alert(true,"Error"," La materia ingresada esta dentro de la franja horaria de una ya guardada.","alert-danger");  
                            } //fin validacion 2)
                    }
                }) 
                //===========fin validaciones==============
                //si todo es valido, pusheo el item
                this.calendarList.push({"id":this.materia.id,"name":this.materia.name,"grade":this.gradeList[index]});
            }
        }
    }
}
