export class Alert{
	active: boolean;
	title: string;
	message: string;
	type: string;


	constructor(active?:boolean,title?:string,message?:string,type?:string){
		this.active = active || false;
		this.title = title || "";
		this.message = message || "";
		this.type = type || "";
	}

}