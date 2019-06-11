

const state:number = 0;

const START:Number = 1;
const END:Number = 0;
//const document = document;

interface TemplateDefinitions {
	reference:Function;
}

interface TemplateReference {

}

/*
ready({
	init:()=>{

	},
	resize:()=>{

	}
})
*/


export default async function(def:TemplateDefinitions):Function {

	return async function(evt:Event) {

		const context:HTMLDocument = document;

		switch(state){

			case 0:

				let template:TemplateReference = def.reference();

				return START;

			break;

			case 1:

				return END;

			break;

		}

	}

}
