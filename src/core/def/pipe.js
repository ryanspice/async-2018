//@flow

import { default as loop } from './loop';

import log from 'loglevel';

import data from '../template/empty.data';

import {
	MD5
} from './utils';

let trace: number = 0;

const _props: Array<string> = [
    'id',
    'ref',
    'value',
    'class',
    'className',
    'click',

    'mounted',
    'sequence',

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

		static pre:Function = ()=>{};
		static post:Function = ()=>{};

    constructor(template: Array<TemplateScheme> = mvc.entry, pre: Function = pipe.pre, post: Function = pipe.post){


        const ors = this.context.onreadystatechange;

        this.context.state = 0;

        if (this.context.readyState === "complete") {

            if (ors) {

                ors();

            }

            if (pre) {
							pre();
						}

            if (post) {
							post();
						}

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

                    if (pre) {
											pre();
										}

                    this.context.state++;

                    break;

                case 1:

                    if (post) {
											post();
										}

                    this.context.state++;

                    this.template[0] = template;

                    this.init();

                    break;
            }

        };

        return;
    }

		a(){
        trace--;
    }

    async init(): Promise < boolean > {

        //trace = 0;
        this.context = document;

        return await this.iterateTemplate();
    }


    async update():any {

        await trace--;

        this.defer.length = 0;
        this.elms.length = 0;
        this.template[0] = await window['async-2018-mvc'].entry.filter(elm => elm.id !== Number(elm.id));

        await this.init();

    }

    /*
        Iterate template data and generate html
    */

    async iterateTemplate(): Promise < boolean > {

      //log.info('iterateTemplate' + trace, this.template);

      if(trace) {

          log.warn(`renderer::` + trace);
          log.warn(`renderer::` + trace);

          return false;
      }

      trace++;

      await loop(this.template, this.createTemplateItem);

      await loop(this.template, this.check);

      this.elms = await this.defer;

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

      //trace--;
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

				/**
				 * support specific elements
				 * @param  {type} type element name
				 */

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

						template.value ?
	          	elm.value = template.value : null;

						elm.renderTo = target;

          break;
        }

        //Defer template item

        if (target === '2430') {

            await this.defer.push(template);

            return false;
        }

				// build stylesheet if needed

				const style = cssText => {

					let style = this.context.createElement('style');

					style.type = 'text/css';

					style.setAttribute('id',template.id.replace('ax-','ax-css-'));

					template.type == `style`?
						style.appendChild(this.context.createTextNode(`${cssText}`.trim()))
						: template.id.split("ax-").length==1?style.appendChild(this.context.createTextNode(`${type}[id="${template.id}"] {${cssText}}`.trim())):style.appendChild(this.context.createTextNode(`${type} {${cssText}}`.trim()));

					template.css = this.context.body.appendChild(style);

				}

				template.style ? style(template.style) : null;

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


                elm.renderTo.insertBefore(elm, elm.renderTo.children[0].nextSibling);

            } else this.elms[id].renderTo.appendChild(this.elms[id], null);


            if (this.elms[id].mounted){

                this.elms[id].mounted(temp, this);

            }
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
    mounted: Function = (evt) => {
        //console.log('eh', this, evt)
    };

}


/**
 * controller for the async view
 */

class mvcc {

	static options:Object = {
		prefix:true,
		prefixName:`ax-`
	}

  static ref:mvcc;
  static entries: Array<any> = [];
  count: number = 0;

  constructor() {

      if (window['async-2018-mvc']) {

          log.warn('DUPLICATE MVC INSTANCES');
          return this;
      }
      return window['async-2018-mvc'] = this;
  }

  get entry() {

      return mvcc.entries;
  }

  set entry(val: any) {
      this.count++;
      mvcc.entries.push(val);
  }

  get last() {

      return mvcc.entries[this.count - 1];
  }

  append = (val) => (this.entry = val);
  //append = (val) => log.debug(`async-2018 :: ./entry.js`, (this.entry = val));
}

/**
 * tooling functions
 */

const _c = new mvcc();
const _mvc = e => _c[e];
const _mvcCmd = e => _mvc(e);
const _mvcAppend = e => _mvcCmd('append')(e);
const _mvcLast = e => _mvcCmd('last');

const mvc = ((e) => { return _c })();

const _mvcId = count => String((mvcc.options.prefix?mvcc.options.prefixName:'') + MD5(`${_c.count}`));

class view {

    mvc: any = _c;

    constructor(val:any) {

      return this.assign(val);
    }

    assign(val:any) {

      _mvcAppend(Object.assign({
          ref: this,
          type: 'template',
          style: '',
          id: _mvcId()
      }, val));

      return _mvcLast();
    }

}

export {data, pipe, view, mvc};
