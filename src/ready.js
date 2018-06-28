

const state:number = 0;

const START = 1;
const END = 0;
const document = document;

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


export default async function(def:TemplateDefinitions) {

	const define

	return await function(evt) {

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
