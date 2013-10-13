
function RCube(canvasObject) {
	this.renderElements = [];
	this.canvasObject = canvasObject;
	this.canvasEl = canvasObject.myCanvasElement;
	this.selectableObjects = this.canvasEl.selectableObjects;
	
	this.cubeLogic = null;
	this.rotating = false;
	
	this.addSelectableItemToCanvas = function(item) {
		this.canvasEl.selectableObjects.push(item);
	};
	
	this.BOXDIMENSION = 50;
	this.boxes = [];
	this.controlBoxes = [];
}

RCube.prototype = {
	hello: function() {
		console.log("hello World!");
		return "hello World!";
	},
	
	getSelectedControlBox: function() {
		for (var i = 0; i < this.controlBoxes.length; i++) {
			if ( this.controlBoxes[i].selected) {
				return this.controlBoxes[i];
			}
		}
		return null;
	},
	
	/**
	 * 
	 * @param pattern: the pattern on the sides of the cube
	 * (Array(6))
	 */
	setupCube: function(pattern) {
		/*
		 * 6 groups, folded open
		 *  	 ______
		 * 		 |_|_|_|
		 *  	 |_|4|_|
		 * ______|_|_|_|____________
		 * |_|_|_|_|_|_|_|_|_|_|_|_|
		 * |_|0|_|_|1|_|_|2|_|_|3|_|
		 * |_|_|_|_|_|_|_|_|_|_|_|_|
		 * 			   |_|_|_|
		 * 			   |_|5|_|
		 * 			   |_|_|_|
		 * 
		 */
		
		var d = this.BOXDIMENSION;
		var list0 = []; 
		var list1 = [];
		var list2 = [];
		var list3 = [];
		var list4 = [];
		var list5 = [];
		
		var par = pattern;
		if (par == null) {
			par = new Array(6);
		}
		
		// group 0
		list0[0] = new MovingBox(-d, d, d, d, d, d);
		list0[1] = new MovingBox( 0, d, d, d, d, d);
		list0[2] = new MovingBox( d, d, d, d, d, d);
		list0[3] = new MovingBox(-d, d, 0, d, d, d);
		list0[4] = new controlBox( 0, d, 0, d, d, d, 0, par);
		list0[5] = new MovingBox( d, d, 0, d, d, d);
		list0[6] = new MovingBox(-d, d,-d, d, d, d);
		list0[7] = new MovingBox( 0, d,-d, d, d, d);
		list0[8] = new MovingBox( d, d,-d, d, d, d);
		var cb0 = list0[4];
		this.controlBoxes[0] = cb0;
		this.addSelectableItemToCanvas(cb0);
		cb0.initGroupBoxList(list0);
//		console.log(cb0.groupBoxes);
		
		// group 1
		list1[0] = list0[2];
		list1[1] = new MovingBox( d, 0, d, d, d, d);
		list1[2] = new MovingBox( d,-d, d, d, d, d);
		list1[3] = list0[5];
		list1[4] = new controlBox( d, 0, 0, d, d, d, 1, par);
		list1[5] = new MovingBox( d,-d, 0, d, d, d);
		list1[6] = list0[8];
		list1[7] = new MovingBox( d, 0,-d, d, d, d);
		list1[8] = new MovingBox( d,-d,-d, d, d, d);
		var cb1 = list1[4];
		this.controlBoxes[1] = cb1;
		this.addSelectableItemToCanvas(cb1);
		cb1.initGroupBoxList(list1);
		
		// group 2 (x-z)
		list2[0] = list1[2];
		list2[1] = new MovingBox(  0,-d, d, d, d, d);
		list2[2] = new MovingBox( -d,-d, d, d, d, d);
		list2[3] = list1[5];
		list2[4] = new controlBox( 0,-d, 0, d, d, d, 2, par);
		list2[5] = new MovingBox( -d,-d, 0, d, d, d);
		list2[6] = list1[8];
		list2[7] = new MovingBox(  0,-d,-d, d, d, d);
		list2[8] = new MovingBox( -d,-d,-d, d, d, d);
		var cb2 = list2[4];
		this.controlBoxes[2] = cb2;
		this.addSelectableItemToCanvas(cb2);
		cb2.initGroupBoxList(list2);
		
		// group 3 (y-z)
		list3[0] = list2[2];
		list3[1] = new MovingBox( -d, 0, d, d, d, d);
		list3[2] = list0[0];
		list3[3] = list2[5];
		list3[4] = new controlBox(-d, 0, 0, d, d, d, 3, par);
		list3[5] = list0[3];
		list3[6] = list2[8];
		list3[7] = new MovingBox( -d, 0,-d, d, d, d);
		list3[8] = list0[6];
		var cb3 = list3[4];
		this.controlBoxes[3] = cb3;
		this.addSelectableItemToCanvas(cb3);
		cb3.initGroupBoxList(list3);
		
		// group 4
		list4[0] = list3[2];
		list4[1] = list3[1];
		list4[2] = list3[0];
		list4[3] = list0[1];
		list4[4] = new controlBox( 0, 0, d, d, d, d, 4, par);
		list4[5] = list2[1];
		list4[6] = list1[0];
		list4[7] = list1[1];
		list4[8] = list1[2];
		var cb4 = list4[4];
		this.controlBoxes[4] = cb4;
		this.addSelectableItemToCanvas(cb4);
		cb4.initGroupBoxList(list4);
		
		// group 5
		list5[0] = list2[6];
		list5[1] = list2[7];
		list5[2] = list2[8];
		list5[3] = list1[7];
		list5[4] = new controlBox( 0, 0, -d, d, d, d, 5, par);
		list5[5] = list3[7];
		list5[6] = list0[8];
		list5[7] = list0[7];
		list5[8] = list0[6];
		var cb5 = list5[4];
		this.controlBoxes[5] = cb5;
		this.addSelectableItemToCanvas(cb5);
		cb5.initGroupBoxList(list5);
//		console.log(this.controlBoxes);
		
		this.cubeLogic = new rubiXCubeLogic(this.controlBoxes);
	},
	
	rotateAroundAxisControlBlock: function(direction, animation) {
		var controlBlock = this.getSelectedControlBox();
		if (controlBlock == null)
			return;
		if (direction != 1 && direction != -1)
			return;
		
//		console.log("rotating..");
		// lock view
		var co = this.canvasObject;
		co.lockView();
		co.lockSelect();
		
		var steps = 0;
		if(animation)
			steps = 15;
		else
			steps = 1;
		
		var steps_to_take = steps;
		var boxList = controlBlock.getAllBoxes();
		var vectorToCenter = controlBlock.getNormalizedVectorToCenter();
		
		// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		(function animLoop() {
			if (steps_to_take <= 0) {
				co.unlockView();
				co.unlockSelect();
			} else {
				window.requestAnimationFrame(animLoop);
				steps_to_take--;
				
				for (var j = 0; j < boxList.length ; j++) {
					var obj = boxList[j].obj;
					
					for ( var k = 0; k < obj.sheets.length; k++) {
						var mySheet = obj.sheets[k];
						
						// rond de as					
						obj.rotateSheet(mySheet, {
							x : -obj.centerp.x,
							y : -obj.centerp.y,
							z : -obj.centerp.z
						}, {
							x : vectorToCenter.x,
							y : vectorToCenter.y,
							z : vectorToCenter.z
						}, (direction)*Math.PI/2/steps); // TODO: afrondingsfouten corrigeren!
					}
				}
				updateEntireView();
			}
		})();
		
		
		// logic aanpassen
		var d = null;
		if (direction == 1)
			d = "right";
		else
			d = "left";
		this.cubeLogic.rotateGroup(controlBlock.getGroupNumber(),d);
		
		// gui aanpassen
		this.cubeLogic.updateControlBoxes();
		
	},
	
	rotateMiddleLaneGroup: function(groupNb, direction) {
		// yet to implement (not necessary?)
	}
};
















