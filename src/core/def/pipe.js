//@flow

import { default as loop } from './loop';

import log from 'loglevel';
log.info('async.2018 :: ./core/def/pipe.js');

import data from '../template/empty.data';

let trace: number = 0;

const _props: Array<string> = [
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


class pipe {

context:Document = document;

template:Array<any> = data;
props:Array<string> = _props;

elms:Array<any> = [];
defer:Array<any> = [];
elements:Array<any> = [];

trace:number = 0;
scrollcount:number = 0;

constructor(template: TemplateScheme, pre: Function = () => { }, post: Function = () => { }){


    const ors = this.context.onreadystatechange;

    this.context.state = 0;

    if (this.context.readyState === "complete") {

        if (ors) {

            ors();

        }

        pre();

        post();

        this.template[0] = template;

        this.init();

        return;
    }

    this.context.onreadystatechange = async (evt: Event) => {

        if (ors) {

            ors();

        }

        switch (this.context.state) {

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

    return;
}





async init(): Promise < boolean > {

    this.context = document;
    
    return await this.iterateTemplate();
}

/*
    Iterate template data and generate html
*/

async iterateTemplate(): Promise < boolean > {

    log.info('iterateTemplate' + trace, this.template);

    if(trace) {

        log.warn(`renderer::` + trace);

        return false;
    }

		trace++;

        await loop(this.template, this.createTemplateItem);
        //return;
    await loop(this.template, this.check);

    this.elms = await this.defer;

    //TODO: recursive
    await loop([this.defer], this.createTemplateItem);
    await loop(this.template, this.check);

    this.elms = this.defer;

    if((this.defer = await this.elms.filter(elm => elm ? elm.ref : null)).length > 0) {

    trace--;

    this.template = await[this.defer];
    this.defer = [];
    this.elms = await[];

    return await this.iterateTemplate();

}

return true;
	}

/*
    Create a DOM element in memory
*/

async createElementOfType(template: TemplateElement): Promise < any > {

    const type: string | null = template.type;

    if(!type) {
        log.warn('Async.2018 tried to render an `undefined` element');
    }

		const target: Element | string = await this.createRenderTarget(template);

    if(!target) {
        log.warn('Async.2018 cannot find a target to render to');
    }

		const elm: HTML5Element = (await this.context.createElement(template.type): HTML5Element);

    if(!elm) {
        log.warn('Async.2018 could not create element', template);
    }

		elm.ref = template.ref;
    elm.afterConstruct = template.afterConstruct;

    switch(type) {

			case "style":

            elm.innerHTML = template.value;
            elm.renderTo = await this.context.head;
            
    break;

    default:

        elm.oninput = template.oninput;

    if(template.onclick) {

        elm.onclick = (evt) => {

            evt.stopPropagation();

            if (typeof template.onclick == 'function') {

                template.onclick();

            } else {


                console.warn('eval disabled')
                eval(template.onclick);

            }

        };

    }

    elm.setAttribute("style",template.style);
    elm.value = template.value;
    elm.renderTo = target;
    
    break;
}

//Defer template item

if (target === '2430') {

    await this.defer.push(template);

    return false;
}

//Populate Props

await this.populateProps(this.props, template, elm);

//EVENT HOOK: afterConstruct
this.afterConstruct(elm);

return elm;
	}

/*
    Generate a reference to the target element, or body if none
*/

async createRenderTarget(template: TemplateElement): Promise < Element | string > {

    //Verify if rendering target exists
    if(template.renderTo != undefined)
if (this.context.querySelectorAll(template.renderTo)[0] == undefined) {

    return '2430';
}

//Return querySelected element, fallback on body
//		if (template.renderTo!=undefined)
return this.context.querySelectorAll(template.renderTo)[0] || this.context.body;
	}

/*
    Populate data props on elements
*/

async populateProps(props: Array < string >, template: __layer, elm: __layer) {

    for (let prop in (props: any)) {

        const temp: string = props[(prop: any)];

        if (template[temp]) {
            elm[temp] = template[temp];
        }

    }

}

/*
    Generate elements based on TemplateItem
*/

createTemplateItem = async (item: TemplateItem) => {

    const element: TemplateElement = await this.createElementOfType(item.value);

    if ((element)) {
        this.elms[item.id] = (this.elements[item.id]) = element;

        element.template = item.id;

    } else {

        // if debugger warning true :: defered :: console.log('false')
        //console.warn('aw',this);
    }

}

/*
    VALIDATION
*/

check = async (temp: TemplateScheme) => {

    const id: number = temp.id;

    let elm: TemplateElement = this.elms[id];

    if ((elm) && (elm.renderTo)) {

        switch (typeof elm.renderTo) {

            case "string":

                let a = this.elms[id];
                elm = this.elms[id] = await this.createElementOfType(a);

                break;
        }

        this.scrollcount++;

        ///NOT FOR PROD

        if (elm.renderTo.id == 'scroll') {

            if (elm.renderTo.children.length == 0) {

                elm.renderTo.appendChild(elm, null);

                return;
            }

            elm.renderTo.appendBefore = (element, t) => {
                element.parentNode.insertBefore(t, element);
            };

            elm.renderTo.appendAfter = (element, t) => {
                element.parentNode.insertBefore(t, element.nextSibling);
            };

            //APPEND PLUS ( usually at end ) TAKEOUT

            if (elm.id == "plus") {

                elm.renderTo.appendBefore(elm.renderTo.children[0], elm);

                return;
            }


            elm.renderTo.insertBefore(elm, elm.renderTo.children[0].nextSibling)


        } else this.elms[id].renderTo.appendChild(this.elms[id], null);

        //END NOT FOR PROD

        this.elms[id] = null;

    }

}

/*
    HOOKS
*/

afterConstruct(elm: TemplateElement) {

    elm.afterConstruct ? elm.afterConstruct() : null;

}

/*
*/
onComplete: Function = () => { };

}

export {data, pipe};