# [AsyncTemplateToRender](https://github.com/ryanspice/async-2018)

AsyncTemplateToRender is a JavaScript library for building user interfaces which top down asynchronously.

* **Asynchronous:** AsyncTemplateToRender creates a unique way to create interactive UI's by taking control of the DOM. Design component systems for your Web Frontend and have complete control over data. Each element is rendered individually and asynchronously.
* **Object-Based:** Using the latest JavaScript (ES6/ES7) to scheme your UI, AsyncTemplateToRender's classes will map to elements providing minimal garbage when rendering/updating keeping data off the DOM.
* **You already know how to manipulate the DOM:** If you're familar with JavasScript, ES6, Objects and the DOM, AsyncTemplateToRender is for you.

[Learn AsyncTemplateToRender today](https://reactjs.org/docs/getting-started.html).

## Installation

AsyncTemplateToRender is designed to be used as a rendering engine for UI components.

**Simply install the library and start creating UI**!

* [Add AsyncTemplateToRender to a Website](https://github.com/ryanspice/async-2018) as a `<script>` tag in one minute.
* [Import AsyncTemplateToRender module](https://www.npmjs.com/package/async.2018) if you're looking to incorporate in a more powerful toolchain.

You can use AsyncTemplateToRender as a `<script>` tag locally, or as a `AsyncTemplateToRender` package on [npm](https://www.npmjs.com/).


## Usage & BuiltIn Legacy Support

AsyncTemplateToRender optimizes bundles and will export both an ES6 and ES5 bundle: **ATRender**, and **ATRender_legacy** respectively.

```html
<!-- Browsers know *not* to load this file -->
<script async type="module" src="ATRender.js"></script>

<!-- Older browsers load this file -->
<script nomodule src="ATRender_legacy.js"></script>

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

Vanilla ES6


```javascript


		const AsyncTemplate = async2018.pipe;
		const AsyncView = async2018.view;
		const AsyncController = async2018.mvc;

		class Main extends async2018.view {

			constructor(){

				super()

				this.id = ``;
				this.type = `main`;
				this.renderTo = `body`;
				this.sequence = 0;
				this.style = `display:inline-block;width:100%;height:100%;padding:-2rem;background:rgba(25,25,25,0.25);`
				this.mounted = async ()=>{
					if (document.getElementsByTagName('loader'))
					if (document.getElementsByTagName('loader')[0])
					document.getElementsByTagName('loader')[0].remove();
				};
				this.innerHTML = ``;

			}

		}

		class HelloWorld extends async2018.view {

			constructor(){

				super()

				this.id = ``;
				this.type = `h2`;
				this.renderTo = `main`;
				this.sequence = 0;
				this.style = `width:200px;margin:0px auto;color:white;padding:1rem;text-outline:1px black;`
				this.mounted = async ()=>{
					console.log('hello world');
				};
				this.innerHTML = `Hello World!!!`;

			}

		}

		AsyncTemplate.pre = async function(){

			window['async-2018-mvc'].entry.sort((a,b)=>{return (a.sequence?a.sequence:0)-(b.sequence?b.sequence:0)});

		};

		AsyncTemplate.post = () => {

		};

		window.onload = function onload(evt){

			new Main();
			new HelloWorld();
			window.home = new AsyncTemplate();

		};


```

*AsyncTemplateToRender* will defer **LoginInput** to a second pass of rendering because it's target doesn't exist during the first pass. *AsyncTemplateToRender* supports recursive rendering, be aware that this can be slow and dangerous.

## Documentation

N/A


### License

AsyncTemplateToRender is [MIT licensed](./LICENSE).
