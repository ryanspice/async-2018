
(Object:any).prototype.insertAfter = function (newNode:Element) { 
	this.parentNode.insertBefore(newNode, this.nextSibling); 
};
