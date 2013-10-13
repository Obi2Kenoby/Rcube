sideControlBox.prototype = new controlBox();
sideControlBox.prototype.constructor = sideControlBox;
sideControlBox.prototype.parent = controlBox.prototype;

function sideControlBox(x, y, z, l, w, h, groupNb) {
	controlBox.call(this,x,y,z,l,w,h);
	
	if (groupNb == "x") { // x
		
	} else if (groupNb == "y") { // y
		
	} else if (groupNb == "z") { // z
		
	}
}