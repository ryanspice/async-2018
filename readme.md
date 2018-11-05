# [Async.2018](https://github.com/ryanspice/async-2018) 

Async.2018 is a JavaScript library for building user interfaces which top down asynchronously.

* **Asynchronous:** Async.2018 creates a unique way to create interactive UI's by taking control of the DOM. Design component systems for your Web Frontend and have complete control over data. Each element is rendered individually and asynchronously.
* **Object-Based:** Using the latest JavaScript (ES6/ES7) to scheme your UI, Async.2018's classes will map to elements providing minimal garbage when rendering/updating keeping data off the DOM.
* **You already know how to manipulate the DOM:** If you're familar with JavasScript, ES6, Objects and the DOM, Async.2018 is for you.

[Learn Async.2018 today](https://reactjs.org/docs/getting-started.html).

## Installation

Async.2018 is designed to be used as a rendering engine for UI components. 

**Simply install the library and start creating UI**!

* [Add Async.2018 to a Website](https://github.com/ryanspice/async-2018) as a `<script>` tag in one minute.
* [Import Async.2018 module](https://www.npmjs.com/package/async.2018) if you're looking to incorporate in a more powerful toolchain.

You can use Async.2018 as a `<script>` tag locally, or as a `async.2018` package on [npm](https://www.npmjs.com/).


## Usage & BuiltIn Legacy Support

Async.2018 optimizes bundles and will export both an ES6 and ES5 bundle: **async-template**, and **async-template.legacy** respectively. 

```html
<!-- Browsers know *not* to load this file -->
<script async type="module" src="async-template.js"></script>

<!-- Older browsers load this file -->
<script nomodule src="async-template.legacy.js"></script>

<!-- executed after HTML is parsed -->
<script type="module">
  console.log('js module');
</script>

<!-- executed immediately -->
<script>
  console.log('standard module');
</script>
```

ES6 bundle provides an optimized webpack output which will support modern browsers with features like **classes** and **async/await**.

## Example

```javascript
require("async-template");

//predefine "view" style component

class Login {

 constructor(){

  return {
   type:`section`,
   renderTo:`main`,
   id:`login_form`,
   innerHTML:`
    <a>
    <h2>Hello World/h2>
    </a>
   `
  };

 }

}

//predefine "input" component to render after Login

class LoginInput {

 constructor(){

  return {
   type:`input`,
   renderTo:`login_form`,
   className:`form-control`,
   id:`userinput_0`
  };

 }

}

//render components listed in array.

new AsyncTemplate(
 [
  new Login(),
  new LoginInput()
 ]
);
```

This example will render a 'section' with a link and h5 saying 'hello world'. 

*Async.2018* will defer **LoginInput** to a second pass of rendering because it's target doesn't exist during the first pass. *Async.2018* supports recursive rendering, be aware that this can be slow and dangerous. 

## Documentation
 
N/A


### License

Async.2018 is [MIT licensed](./LICENSE).