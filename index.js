//@flow

//ES6 Module

import * as Async2018 from "./dist";

window['async-template-library'] = window['async-template-library'].default.core.template.AsyncRenderPipe;

//ES5 Export

export default require('./dist/async-template.legacy').default.core.template.AsyncRenderPipe;
