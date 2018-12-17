
Object.prototype.insertAfter = function (newNode) { 
	this.parentNode.insertBefore(newNode, this.nextSibling);
};
