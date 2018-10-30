//@flow

//import fade from "./unused/fade";

//import markup from "./def/markup";

Object.prototype.insertAfter = function (newNode) { this.parentNode.insertBefore(newNode, this.nextSibling); }

import {data, AsyncRenderPipe} from "./def/template";

export default {
	"template": {data,AsyncRenderPipe},
}
