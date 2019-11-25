//@flow

import "ecmascript-toolkit";

import {data,pipe,view,mvc} from "./core/def/pipe";

import "./core/def/storage/storage.getobject";
import "./core/def/storage/storage.setobject";

/**
 * storage temp class
 * @type {[type]}
 */

class storage {
	constructor(){
		this.setObject = async (key,data) => {
			return await sessionStorage.setObject(key,data);
		};
		this.getObject = async (key) => {
			return await sessionStorage.getObject(key);
		};
	}
	async fetch(key,data){
		return await this.setObject(key,await (await fetch("/api/v1"+data)).json());
	}
}

requestAnimationFrame(e=>{
	window.async2018 = {data,pipe,view,mvc, storage};
})
export {data,pipe,view,mvc, storage};
