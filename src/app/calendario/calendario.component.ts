import { Component, OnInit, HostBinding } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { MateriaService } from '../materia.service';
import { Materia } from '../materia';
import { Grade } from '../grade';
import { Alert } from '../detalle/alert'


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



                 


    // Recorre dos listas para verificar si hay elementos en comun entre ellas
    // Devuelve true si hay elementos repetidos
    isRepeated(haystack:string[], arr:string[]) {
            return arr.some(function (v) {
                    return haystack.indexOf(v) >= 0;
            });
    };

     setClass(i:number,j:number){
        for(let materia of this.calendarList){
            let daysArray = materia.grade.days.split(",").map(str=>str.trim());
            for(let day of daysArray){
                if((i>=Number(materia.grade.hours[0]-1) && i<= Number(materia.grade.hours[materia.grade.hours.length-1]-1)) && j == this.parseDay(day)){
                        return {selected:true}
                }
            }
        }
        return {selected:false};
    }



    
    getCurso(gradeId: number){
        //0) valido que llegue un curso
        if(gradeId === null) throw new Alert(true,"Atencion"," Ningun curso ha sido seleccionado.","alert-warning");
        
        for (let index in this.gradeList) {
            //busco el curso particular en la lista de la materia
            if(this.gradeList[index].id === gradeId){
                //===========arrancan las validaciones==============
                this.calendarList.forEach(item =>{
                    //1)valido que no se repita la materia o el curso
                    if(item.id == this.materia.id){
                        throw new Alert(true,"Error"," Materia ya ingresada.","alert-danger");
                    }//fin validacion 1)
                    let newDayArray=item.grade.days.split(",").map(str=>str.trim());
                    let savedDayArray=this.gradeList[index].days.split(",").map(str=>str.trim());
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
                //fijarse bien la documentacion de ngclass y la edicion del clases desde el ts como directive
                
            }
        }
    }
}
