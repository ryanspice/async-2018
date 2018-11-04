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

	onreadystatechange: Function;
	state: number;

}

interface Storage extends Storage {

	setObject: Function;
	getObject: Function;

}

interface AsyncPipes {

	requireCSS: Function;
	requireHTML: Function;
	requireIcons: Function;
	requireListeners: Function;
	requireMSG: Function;


}



interface TemplateDefinitions {
	reference:Function;
}

interface TemplateReference {

}




interface TemplateElement {

	type: string;
	value: string;
	ref: string;

	renderTo?: string;
	class?: string;
	style?: string;

	afterConstruct?: Function;

	onclick?: Function;
	oninput?: Function;
}

interface TemplateItem {

	id: number;
	value: TemplateElement;

}

interface TemplateScheme {

	id: number;
	value: TemplateItem;

}

type __data = Array<Object>;
type __dataMap = Array<TemplateScheme>;

type __layer = Promise<Array<Object>>;
type __template = Promise<TemplateScheme>;
type __elements = Promise<TemplateElement>;

export interface HTML5Element extends HTMLElement {


	style: CSSStyleDeclaration;
	class?: string;
	value?: string;
	renderTo?: any;
}


export interface ViewSchema {

	type: string;

	id: string;
	style?: string;

	link?: HTML5Element;

	ref?: HTML5Element;

	className: string;
	innerHTML: string;

	onclick?: any;

}

export type Element = HTML5Element | null;
