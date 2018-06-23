//@flow

// self contained, loop


let trace = 0;

let _data:Array<any>;
let _length:number = 0;
let _iterator:number = 0;
let _iteratorId = null;

const _layer = async ():Promise<any> => {

	_data[_iterator] = {
		id:_iterator,
		value:_data[_iterator]
	};

	return _data[_iterator];
};

/**/

let _action = () => {};

/**/

const _loop = async function(data:Array<any>,action:Function) {

	if (_data==null){

		_data = [];
		for(let i = data.length;i>=0;i--){

			_data[i] = null;

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
