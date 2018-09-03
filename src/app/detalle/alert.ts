export class Alert {
	active: boolean;
	title: string;
	message: string;
	type: string;

	// el constructor tiene parametros opcionales (parm?:type)
	constructor(active?: boolean, title?: string, message?: string, type?: string) {
		// asigna el valor del constructor o
		this.active = active || false;
		this.title = title || '';
		this.message = message || '';
		this.type = type || '';
	}

}
