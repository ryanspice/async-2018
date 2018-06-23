//@flow

import fade from "./fade";
import markup from "./markup";
import {data, AsyncRenderPipe} from "./template";

let template = {data,AsyncRenderPipe};
export default {
	fade,
	markup,
	template,
}
