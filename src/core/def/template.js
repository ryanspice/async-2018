//@flow

import log from 'loglevel';
log.info('async.2018 :: ./core/def/template.js');

import data from '../template/empty.data';

import pipe from "./pipe";


/*
	AsyncRenderPipe
		create on onreadystatechange, or whenever you want to render.
		will render to evt.currentTarget
*/


const AsyncRenderPipe = pipe;

/*
	Default Data Template
*/

export { pipe, data }
