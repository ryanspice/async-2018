//@flow

Storage.prototype.getObject = function(key) {

	let value:object = this.getItem(key);
	let ttl:object = this.getItem(key + "~ttl");

	if(ttl) {

		if(ttl<new Date().getTime()) {

  		this.removeItem(key);
  		this.removeItem(key + "~ttl");

  		return false;
		}

	}

	return value && JSON.parse(value);
};
