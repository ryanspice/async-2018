//@flow

console.log(require('./dist/async-template'))

console.log(window['async-template-library'])

console.log(require('./dist/async-template.legacy'))

export default window['async-template-library'].default.core.template.AsyncRenderPipe;

//export default require('./dist/async-template').default.core.template.AsyncRenderPipe;
