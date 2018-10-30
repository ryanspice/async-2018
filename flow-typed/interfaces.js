//@flow

declare module "SpiceJS" {


}

declare module "loglevel" {


}

declare module "feather-icons" {


}

declare module "../node_modules/loglevel" {
	//core:any;
}


interface Document extends Document {

	onreadystatechange:Function;
	state:number;

}

interface Storage extends Storage {

	setObject:Function;
	getObject:Function;

}

interface AsyncPipes {

	requireCSS:Function;
	requireHTML:Function;
	requireIcons:Function;
	requireListeners:Function;
	requireMSG:Function;


}







interface TemplateElement {

  type: string;
  value: string;

  renderTo?: string;
  class?: string;
  style?: string;

}

interface TemplateItem {

	id:string;
	value:TemplateElement;

}

interface TemplateScheme {

	id:string;
	value:TemplateItem;

}

export interface HTML5Element extends HTMLElement {


	  class?: string;
	  style?: CSSStyleDeclaration;
		value?:string;
		renderTo?:any;
}


export interface ViewSchema {

	type:string;

	id:string;
	style?:string;

	link?:HTML5Element;

	ref?:HTML5Element;

	className:string;
	innerHTML:string;

	onclick?:any;

}

export type Element = HTML5Element|null;