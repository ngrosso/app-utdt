import { Grade } from './grade'

export class Materia {
	id: number;
	name: string;
	duration: string;
	weeklyHours: number;
	subjectCode: string;
	chiefName: string;
	chiefLastName: string;
	gradeList: Grade[];
}