//@flow

import type {Element} from "./interfaces";

import data from '../no_template.data';

import {default as loop} from './loop';

const templatePicks = [
	'id',
	'value',
	'class',
	'className',
	'onclick',
	'click',
	'onresize',
	`innerHTML`
];


let elms = [];
let elements = [];
let elm:Element;
let templateDefer = [	];

/*
	AsyncRenderPipe
		create on onreadystatechange, or whenever you want to render.
		will render to evt.currentTarget
*/

export class AsyncRenderPipe {

	context:HTMLDocument = document;
	template:Array<any> = data;

	constructor(evt:DocumentEvent){

		this.init(evt);

	}

	async init(evt:any){

		this.context = await evt.currentTarget;

		await this.iterateTemplate(this.template[0])

	}

	check = async (evt:any)=>{

		if (elms[evt.id])
		if (elms[evt.id].renderTo){

			//if (typeof elms[evt.id].renderTo === "string"){


			//			if (!typeof elms[evt.id].renderTo === "string")
			//			return;

			//console.log(elms[evt.id].renderTo.appendChild,typeof elms[evt.id].renderTo)

			if (typeof elms[evt.id].renderTo === "string"){

				//console.log('fuck',elms[evt.id], document.querySelectorAll(elms[evt.id].renderTo))
				//let el = document.querySelectorAll(elms[evt.id].renderTo);
				//el.appendChild(elms[evt.id]);
				elms[evt.id] = await this.createElementOfType(elms[evt.id]);


			}


			elms[evt.id].renderTo.appendChild(elms[evt.id]);
			elms[evt.id] = null;
		//}
			//templateDefer[evt.id] = null;

		}


	}

	/* generate a reference to the target element, or body if none */

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

	/**/

	createTemplateItem = async (item:any) => {

		let template = item.value;
		let element = await this.createElementOfType(template);
		//console.log(element);
		if (element!=false){

			elms[item.id] = (elements[item.id]) = element;

		} else {

			// if debugger warning true :: console.log('false')

		}

	}

	/* Create a DOM element in memory */

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

					elm.onclick = (evt)=>{
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

		if (renderTo=='2430'){

			templateDefer.push(template);

			return false;
		}

		if (templatePicks)
		for(let prop in templatePicks){

			if (template[templatePicks[prop]])
				elm[templatePicks[prop]] = template[templatePicks[prop]];

		}

		return elm;
	}

	/* iterate template data and generate html */

	async iterateTemplate(tpl:any){

		if (trace){

			//console.warn(`renderer::`+trace);

			return;
		}

		trace++;


		let layers = tpl;
		let length = layers.length;

		//let elements = tpl;
		let type, style, value;
		let elm;

		await loop(this.template,this.createTemplateItem);
		await loop(this.template,this.check);


		elms = templateDefer;

		//TODO: recursive
		await loop([templateDefer],this.createTemplateItem);
		await loop(this.template,this.check);



		elms = templateDefer;

	}

}

let trace = 0;

export {data};
