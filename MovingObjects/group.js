
function group(boxes) {
	/*
	 * 6 groups, folded open
	 *  	 ______
	 * 		 |_|_|_|
	 *  	 |_|_|_|
	 * ______|_|_|_|____________
	 * |_|_|_|_|_|_|_|_|_|_|_|_|
	 * |_|_|_|_|_|_|_|_|_|_|_|_|
	 * |_|_|_|_|_|_|_|_|_|_|_|_|
	 * 			   |_|_|_|
	 * 			   |_|_|_|
	 * 			   |_|_|_|
	 * 
	 */
//	this.color = "undefined";
//	if (myColor != null)
//		this.color = myColor;
	this.dimension = 3;
	this.startingBoxes = boxes;
	this.elements = [];
	for (var i = 0 ; i < this.startingBoxes.length ; i++) {
		this.elements[i] = this.startingBoxes[i];
	}
	
//	this.neighbourGroups = new Array(4);
	
}

group.prototype = {
		
	setElement: function(boxElementList) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i] = boxElementList[i];
		}
	},
	
	getRow: function(rowNb) {
		var dim = this.elements.length / 3;
		var newArray = [];
		for (var i = 0; i < dim; i++) {
			newArray[i] = this.elements[i + (dim * (rowNb - 1))];
		}
		return newArray;
	},
	
	getColumn: function(colNb) {
		var dim = this.elements.length / 3;
		var newArray = [];
		for (var i = 0; i < dim; i++) {
			newArray[i] = this.elements[i*dim + (colNb - 1)];
		}
		return newArray;
	},
	
//	setNeighbourGroups: function(north, east, south, west) {
//		this.neighbourGroups[0] = north;
//		this.neighbourGroups[1] = east;
//		this.neighbourGroups[2] = south;
//		this.neighbourGroups[3] = west;
//	},
		
	rotateLeft: function() {
		var copyArray = new Array();
		copyArray[0] = this.elements[2];
		copyArray[1] = this.elements[5];
		copyArray[2] = this.elements[8];
		copyArray[3] = this.elements[1];
		copyArray[4] = this.elements[4];
		copyArray[5] = this.elements[7];
		copyArray[6] = this.elements[0];
		copyArray[7] = this.elements[3];
		copyArray[8] = this.elements[6];
		this.elements = copyArray;
	},
	
	rotateRight: function() {
		var copyArray = new Array();
		copyArray[0] = this.elements[6];
		copyArray[1] = this.elements[3];
		copyArray[2] = this.elements[0];
		copyArray[3] = this.elements[7];
		copyArray[4] = this.elements[4];
		copyArray[5] = this.elements[1];
		copyArray[6] = this.elements[8];
		copyArray[7] = this.elements[5];
		copyArray[8] = this.elements[2];
		this.elements = copyArray;
	},
	
	changeXthRow: function(boxArray, rowNb) {
		for (var i = 0; i < boxArray.length; i++) {
			this.elements[i + (boxArray.length * (rowNb - 1))] = boxArray[i];
		}
	},
	
	changeXthColumn: function(boxArray, columnNb) {
		for (var i = 0; i < boxArray.length; i++) {
			this.elements[i*boxArray.length + (columnNb - 1)] = boxArray[i];
		}
	}
};




