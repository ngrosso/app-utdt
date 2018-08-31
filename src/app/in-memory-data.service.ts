import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{

	createDb(){
		const Materias = 
		[
		   {
		      "id": 1,
		      "name": "Análisis Matemático I",
		      "duration": "Anual",
		      "weeklyHours": 20,
		      "subjectCode": "082025",
		      "chiefName": "Pablo",
		      "chiefLastName": "Fernandez",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Lun(N), Sab(N)",
		            "hours": "4 a 6",
		            "profLastName": "Martinez",
		            "profName": "Ana"
		         },
		         {
		            "id": 2,
		            "days": "Mie(N)",
		            "hours": "2 a 5",
		            "profLastName": "García",
		            "profName": "Carla"
		         },
		         {
		            "id": 3,
		            "days": "Mar(N)",
		            "hours": "3 a 6",
		            "profLastName": "Fernandez",
		            "profName": "Pablo"
		         },
		         {
		            "id": 4,
		            "days": "Mar(T)",
		            "hours": "5 a 6",
		            "profLastName": "Fernandez",
		            "profName": "Pablo"
		         }
		      ]
		   },
		   {
		   	  "id":2,
		      "name": "Física I",
		      "duration": "Cuatrimestral",
		      "weeklyHours": 25,
		      "subjectCode": "081043",
		      "chiefName": "Rodriguez",
		      "chiefLastName": "Pedro",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Vie(N)",
		            "hours": "4 a 6",
		            "profLastName": "Iván",
		            "profName": "Robles"
		         },
		         {
		            "id": 2,
		            "days": "Mie(N)",
		            "hours": "2 a 5",
		            "profLastName": "Cantero",
		            "profName": "Cristian"
		         },
		         {
		            "id": 3,
		            "days": "Mar(N)",
		            "hours": "3 a 6",
		            "profLastName": "Medina",
		            "profName": "Rafael"
		         },
		         {
		            "id": 4,
		            "days": "Jue(N)",
		            "hours": "1 a 4",
		            "profLastName": "Mesa",
		            "profName": "Milagros"
		         },
		         {
		            "id": 5,
		            "days": "Mar(T)",
		            "hours": "1 a 6",
		            "profLastName": "Mesa",
		            "profName": "Milagros"
		         }
		      ]
		   },
		   {
		   	  "id":3,
		      "name": "Comunicaciones",
		      "duration": "Cuatrimestral",
		      "weeklyHours": 15,
		      "subjectCode": "079237",
		      "chiefName": "Alsina",
		      "chiefLastName": "María",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Mar(N), Sab(N)",
		            "hours": "4 a 6",
		            "profLastName": "Alsina",
		            "profName": "María"
		         },
		         {
		            "id": 2,
		            "days": "Vie(N)",
		            "hours": "2 a 5",
		            "profLastName": "Montoya",
		            "profName": "Rosa"
		         }
		      ]
		   },
		   {
		   	  "id":4,
		      "name": "Investigación Operativa",
		      "duration": "Cuatrimestral",
		      "weeklyHours": 8,
		      "subjectCode": "085573",
		      "chiefName": "Alejandro",
		      "chiefLastName": "Almagro",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Lun(N), Jue(N)",
		            "hours": "3 a 6",
		            "profLastName": "Alejandro",
		            "profName": "Almagro"
		         }
		      ]
		   },
		   {
		   	  "id":5,
		      "name": "Química I",
		      "duration": "Cuatrimestral",
		      "weeklyHours": 20,
		      "subjectCode": "083218",
		      "chiefName": "Esteban",
		      "chiefLastName": "Morillo",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Lun(N), Vie(N)",
		            "hours": "1 a 6",
		            "profLastName": "Alsina",
		            "profName": "María"
		         },
		         {
		            "id": 2,
		            "days": "Mie(N), Jue(N)",
		            "hours": "1 a 6",
		            "profLastName": "Carolina",
		            "profName": "Torrado"
		         },
		         {
		            "id": 3,
		            "days": "Mar(N), Vie(N)",
		            "hours": "1 a 6",
		            "profLastName": "Alfredo",
		            "profName": "Serrano"
		         }
		      ]
		   },
		   {
		   	  "id":6,
		      "name": "Álgebra I",
		      "duration": "Anual",
		      "weeklyHours": 20,
		      "subjectCode": "084323",
		      "chiefName": "Angel",
		      "chiefLastName": "Carril",
		      "gradeList": [
		         {
		            "id": 1,
		            "days": "Lun(N), Sab(N)",
		            "hours": "1 a 6",
		            "profLastName": "Carril",
		            "profName": "Angel"
		         },
		         {
		            "id": 2,
		            "days": "Mar(N), Jue(N)",
		            "hours": "1 a 6",
		            "profLastName": "Espinola",
		            "profName": "Ruben"
		         },
		         {
		            "id": 3,
		            "days": "Mie(N), Vie(N)",
		            "hours": "1 a 6",
		            "profLastName": "Arias",
		            "profName": "Angeles"
		         },
		         {
		            "id": 4,
		            "days": "Mie(N), Sab(N)",
		            "hours": "1 a 6",
		            "profLastName": "Castillo",
		            "profName": "Laura"
		         }
		      ]
		   }
		];
		return {Materias}

	}
}