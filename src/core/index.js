//@flow

import fade from "./fade";
import markup from "./markup";
import {data, AsyncRenderPipe} from "./template";

export default {
	fade,
	markup,
	"template": {data,AsyncRenderPipe},
}
