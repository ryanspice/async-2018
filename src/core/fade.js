//@flow

//FadeElement function
let _global_fade:number = 0;

const fade = async function(element:HTMLElement):void {

	_global_fade+=0.25;

	if (_global_fade>1) {

		_global_fade = 0;

		return;
	}

	let b = _global_fade;

	if (b>1)
		b = 1;

	//if (element)
	//zelement.style.opacity = b+10;

	requestAnimationFrame(fade:any);

}

export default fade;
