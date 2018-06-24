//@flow

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
