//@flow

import {data,pipe,view,mvc} from "./core/def/pipe";

/**
 * storage temp class
 * @type {[type]}
 */

class storage {
	constructor(){
		this.setObject = async (key,data) => {
			return await sessionStorage.setItem(key,await JSON.stringify(data));
		};
		this.getObject = async (key) => {
			return await JSON.parse(await sessionStorage.getItem(key))
		};
	}
	async fetch(key,data){
		return await this.setObject(key,await (await fetch("/api/v1"+data)).json());
	}
}


export {data,pipe,view,mvc, storage};
