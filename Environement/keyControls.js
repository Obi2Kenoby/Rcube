

function keyControls(cube, anim) {
	var self = this;
	self.animation = anim;
	
	cube.canvasEl.onkeydown = function(event) {
		event = event || window.event;
		event.preventDefault();
		
		switch (event.which) {
		// left arrow
		case 37:
			cube.rotateAroundAxisControlBlock(-1, self.animation);
			break;
		// right arrow
		case 39:
			cube.rotateAroundAxisControlBlock(1, self.animation);
			break;
		default:
			break;
		}
		
	};
	
}

keyControls.prototype = {
	setAnimation: function(bool) {
		this.animation = bool;
	}	
};
