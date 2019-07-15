//@flow

Storage.prototype.setObject = function(key:string, value:object, expirationInMin:number) {

	this.setItem(key, JSON.stringify(value));

	if(expirationInMin) {

		let time = new Date().getTime() + (60000 * expirationInMin);
		this.setItem(key + "~ttl", time);
	}

};
