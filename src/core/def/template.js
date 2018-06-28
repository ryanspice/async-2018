//@flow

import type {Element} from "./interfaces";

import {default as loop} from './loop';

import data from '../../no_template.data';

let trace = 0;

/*
	AsyncRenderPipe
		create on onreadystatechange, or whenever you want to render.
		will render to evt.currentTarget
*/

export class AsyncRenderPipe {

	context:HTMLDocument = document;
	template:Array<any> = data;

	defer:Array<any> = [];

	elms:Array<any> = [];
	elements:Array<any> = [];

	trace:number = 0;

	props:Array<string> = [
		'id',
		'value',
		'class',
		'className',
		'onclick',
		'click',
		'onresize',
		`innerHTML`
	];

	constructor(evt:DocumentEvent){

		this.init(evt);

	}

	/* async init */

	async init(evt:any){

		this.context = await evt.currentTarget;

		await this.iterateTemplate(this.template[0])

	}

	/*
		Create or renderTo
	*/

	check = async (evt:any)=>{

		if ((this.elms[evt.id])&&(this.elms[evt.id].renderTo)) {

			if (typeof this.elms[evt.id].renderTo === "string"){

				this.elms[evt.id] = await this.createElementOfType(this.elms[evt.id]);

			}

			this.elms[evt.id].renderTo.appendChild(this.elms[evt.id]);
			this.elms[evt.id] = null;

		}

	}

	/*
		generate a reference to the target element, or body if none
	*/

	async createRenderTarget(template:TemplateElement){

		//Verify if rendering target exists
		if (template.renderTo!=undefined)
			if (this.context.querySelectorAll(template.renderTo)[0] == undefined){

			return '2430';
		}

		//Return querySelected element, fallback on body
		//		if (template.renderTo!=undefined)
		return this.context.querySelectorAll(template.renderTo)[0] || this.context.body;
	}

	/*

	*/

	createTemplateItem = async (item:any) => {

		let template = item.value;

		let element = await this.createElementOfType(template);

		if (element!=false){

			this.elms[item.id] = (this.elements[item.id]) = element;

		} else {

			// if debugger warning true :: console.log('false')

		}

	}

	/*
		Create a DOM element in memory
	*/

	async createElementOfType(template:TemplateElement){

		let elm:HTML5Element;

		const type:string = template.type;

		const renderTo = await this.createRenderTarget(template);

		elm = (await document.createElement(template.type):HTML5Element);

		switch(type){

			case "style":

				elm.innerHTML = template.value;
				elm.renderTo = await document.head;

			break;

			default:

				if (template.onclick){

					/*
					elm.removeEventListener('click');
					elm.addEventListener('click',(evt)=>{
						evt.stopPropagation();
						if (typeof template.onclick == 'function'){
							template.onclick();}
							else{
						eval(template.onclick);}
					});
					*/

					elm.onclick = (evt) => {
						evt.stopPropagation();
						if (typeof template.onclick == 'function'){
							template.onclick();}
							else{
						eval(template.onclick);}
					};

				}

				elm.style = template.style;
				elm.value = template.value;
				elm.renderTo = renderTo; //await createRenderTarget(template);

		}

		//Defer template item

		if (renderTo=='2430'){

			this.defer.push(template);

			return false;
		}

		//Populate Props
		/*
			if (templatePicks)
			for(let prop in templatePicks){

				if (template[templatePicks[prop]])
					elm[templatePicks[prop]] = template[templatePicks[prop]];

			}
		*/

		//Populate Props
		if (this.props)
			await this.populateProps(this.props,template,elm);

		return elm;
	}

	/* */

	async populateProps(props, template, elm){

		for(let prop in props){

			if (template[props[prop]])
				elm[props[prop]] = template[props[prop]];

		}

	}


	/*
		iterate template data and generate html
	*/

	async iterateTemplate(tpl:any){

		if (trace){

			//console.warn(`renderer::`+trace);

			return;
		}

		trace++;

		let layers = tpl;
		let length = layers.length;

		let type, style, value;
		let elm;

		await loop(this.template,this.createTemplateItem);
		await loop(this.template,this.check);

		this.elms = this.defer;

		//TODO: recursive
		await loop([this.defer],this.createTemplateItem);
		await loop(this.template,this.check);

		this.elms = this.defer;

	}

}

/*
	Default Data Template
*/

export {data};
