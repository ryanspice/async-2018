//@flow 

import {default as loop} from './loop';

import log from 'loglevel';
import data from '../template/empty.data';


const context:Document = document;

let trace:number = 0;

/*
	AsyncRenderPipe
		create on onreadystatechange, or whenever you want to render.
		will render to evt.currentTarget
*/

export class AsyncRenderer {

	context:Document = context;
	template:Array<any> = data;

	defer:Array<any> = [];

	elms:Array<any> = [];
	elements:Array<any> = [];

	trace:number = 0;
	scrollcount:number = 0;

	props:Array<string> = [
		'id',
		'ref',
		'value',
		'class',
		'className',
		'click',
		'onclick',
		'onresize',
		'oninput',
		'activity',
		`innerHTML`
	];


	constructor(template, pre=()=>{}, post=()=>{}){

		this.context.state = 0;
		let ors = document.onreadystatechange;

		if (document.readyState === "complete") {

			if(ors)
				ors();
			pre();
			post();
			this.template[0] = template;
			this.init();
			return;
		}

		this.context.onreadystatechange = async (evt:Event)=>{

			if (ors)
				ors();

			switch(this.context.state){

				case 0:

					pre();
					this.context.state++;

				break;

				case 1:

					post();
					this.context.state++;

					this.template[0] = template;
					this.init();

				break;
			}

		};

	}

	/* async init */

	async init():boolean {

		this.context = document;

		return await this.iterateTemplate();
	}

	/*
		iterate template data and generate html
	*/

	async iterateTemplate():boolean {

		log.info('iterateTemplate'+trace, this.template);

		if (trace){

			log.warn(`renderer::`+trace);

			return false;
		}

		trace++;

		await loop(this.template,this.createTemplateItem);
		await loop(this.template,this.check);

		this.elms = await this.defer;

		//TODO: recursive
		await loop([this.defer],this.createTemplateItem);
		await loop(this.template,this.check);

		this.elms = this.defer;

		if ((this.defer = await this.elms.filter(elm=>elm?elm.ref:null)).length>0){

			trace--;

			this.template = await [this.defer];
			this.defer = [];
			this.elms = await [];

			return await this.iterateTemplate();

		}

		return true;
	}

	/*
		Create a DOM element in memory
	*/

	async createElementOfType(template:TemplateElement):Element {

		const type:string|null = template.type;

		if (!type){

			log.warn('Async.2018 tried to render an `undefined` element');

		}

		const target:Element|null = await this.createRenderTarget(template);

		if (!target){

			log.warn('Async.2018 cannot find a target to render to');

		}

		const elm:HTML5Element = (await this.context.createElement(template.type):HTML5Element);

		if (!elm){

			log.warn('Async.2018 could not create element', template);

		}

		elm.afterConstruct = template.afterConstruct;

		elm.ref = template.ref;

		switch(type){

			case "style":

				elm.innerHTML = template.value;
				elm.renderTo = await this.context.head;

			break;

			default:

				elm.oninput = template.oninput;

				if (template.onclick){

					elm.onclick = (evt) => {

						evt.stopPropagation();

						if (typeof template.onclick == 'function'){

							template.onclick();

						}	else {

							eval(template.onclick);

						}

					};

				}

				elm.style = template.style;
				elm.value = template.value;
				elm.renderTo = target;

		}

		//Defer template item

		if (Number(target)===2430){

			await this.defer.push(template);

			return false;
		}

		//Populate Props

		await this.populateProps(this.props,template,elm);

		//EVENT HOOK: afterConstruct
		this.afterConstruct(elm);

		return elm;
	}

	/*
		generate a reference to the target element, or body if none
	*/

	async createRenderTarget(template:TemplateElement):Element|string {

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
		populate data props on elements
	*/

	async populateProps(props:Array<string>, template:TemplateElement, elm:any){

		for(let prop in props){

			if (template[props[prop]])
				elm[props[prop]] = template[props[prop]];

		}

	}

	/**/

	onComplete:Function = () => {};

	/*

	*/

	createTemplateItem = async (item:TemplateScheme) => {

		let element;

		if ((element=await this.createElementOfType(item.value))){

			this.elms[item.id] = (this.elements[item.id]) = element;

			element.template = item.id;

		} else {

			// if debugger warning true :: console.log('false')

		}

	}

	/*
		VALIDATION
	*/

	check = async (evt:any)=>{

		let elm = this.elms[evt.id];

		if ((elm)&&(elm.renderTo)) {

			switch(typeof elm.renderTo){

				case "string":

					elm = this.elms[evt.id] = await this.createElementOfType(this.elms[evt.id]);

				break;
			}

			this.scrollcount++;

			if (elm.renderTo.id=='scroll') {


				//FIRST APPEND
				//console.log(elm.id)
				if (elm.renderTo.children.length==0){

					elm.renderTo.appendChild(elm, null);

					return;
				}


				elm.renderTo.appendBefore = (element, t)=> {
				    element.parentNode.insertBefore(t, element);
				};

				elm.renderTo.appendAfter = (element, t)=> {
				    element.parentNode.insertBefore(t, element.nextSibling);
				};

				//APPEND PLUS ( usually at end )

				if (elm.id=="plus"){

					elm.renderTo.appendBefore(elm.renderTo.children[0], elm);

					return;
				}


				elm.renderTo.insertBefore(elm,elm.renderTo.children[0].nextSibling)


			}	else this.elms[evt.id].renderTo.appendChild(this.elms[evt.id], null);

			this.elms[evt.id] = null;

		}

	}

	/*
		HOOKS
	*/

	afterConstruct(elm){

		elm.afterConstruct?elm.afterConstruct():null;

	}

}

export class AsyncRenderPipe extends AsyncRenderer {

}
/*
	Default Data Template
*/

export {data};
