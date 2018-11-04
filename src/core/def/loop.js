//@flow

/*
	self contained, loop
*/

let _data:__data = [];

let _loop_iterator: number;

let _length: number = 0;
let _iterator: number = 0;
let _iteratorId: number = 0;

let trace:number = 0;

/**/

let _action: Function = () => { };

/**/

const _dataMap: __dataMap = [];

/**/

class _template {
	id:number;
	value:Object;
	constructor(id:number, value:Object){
		this.id = id;
		this.value = value;
		return (this:__template);
	}
}

/**/

const _dataTemplate = async function(i:number, data:Object):__template {

	return await (_dataMap[i] = await new _template(i,data));
}

/**/

const _layer = async function():__layer {

	_iteratorId++;
	_data[_iterator] = await (_dataTemplate(_iterator, _data[_iterator]));

	return _data[_iterator];
}

/**/

const _loop = async function(data:Array<__data>,action:Function) {

	if (_data===null){

		_loop_iterator = _data.length = 0;
		
		for (_loop_iterator; _loop_iterator >= 0; _loop_iterator--){

			_data[_loop_iterator] = _dataTemplate(-1,{});

		}

	}
	
	_data = data[0]; 
	_length = _data.length || 0;
	_action = action;

	for(_iterator; _iterator<_length;_iterator++){

		await _action(await _layer());

	}

	_iterator = 0;

};

/**/

export default _loop;