


/**
 * Class canvasElement
 * @returns
 */
function canvasElement() {
	this.myCanvasElement = document.getElementById('mainCanvas');
	// FOR TESTING
	if (this.myCanvasElement == null) {
		console.log("ERROR: could not find the main Canvas");
		this.myCanvasElement = document.createElement('canvas');
	}
	this.myContext = this.myCanvasElement.getContext('2d');
	sheetengine.scene.init(this.myCanvasElement, {w:2000,h:1500});
	
	this.myCanvasElement.selectableObjects = [];
	this.myCanvasElement.viewAccess = true;
	
	
	// http://www.ibm.com/developerworks/library/wa-games/wa-games-pdf.pdf
	// do nothing in the event handler except canceling the event
	this.myCanvasElement.ondragstart = function(e) { 
		if (e && e.preventDefault) { e.preventDefault(); } 
		if (e && e.stopPropagation) { e.stopPropagation(); } 
		return false;
	};
	
	// do nothing in the event handler except canceling the event
	this.myCanvasElement.onselectstart = function(e) { 
		if (e && e.preventDefault) { e.preventDefault(); } 
		if (e && e.stopPropagation) { e.stopPropagation(); } 
		return false;
	};
	
	// TODO: Kinetic.js: http://www.html5canvastutorials.com/kineticjs/html5-canvas-path-mouseover/
	
//	http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = 
	          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
	
	this.myViewSettings = new viewSettings(this);
}

canvasElement.prototype = {
		
	addSelectableItem: function(item) {
		this.myCanvasElement.selectableObjects.push(item);
	},

	getSelectedItem: function() {
		var list = this.myCanvasElement.selectableObjects;
		for (var i = 0; i < list.length; i++) {
			if (list[i].selected) 
				return list[i];
		}
	},
	
	lockView: function() {
		this.myCanvasElement.viewAccess = false;
	},
	
	unlockView: function() {
		this.myCanvasElement.viewAccess = true;
	},
	
	lockSelect: function() {
		this.myViewSettings.lockSelect();
	},
	
	unlockSelect: function() {
		this.myViewSettings.unlockSelect();
	}
};




