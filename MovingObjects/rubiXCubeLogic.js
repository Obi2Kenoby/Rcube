
function rubiXCubeLogic(controlBoxList) {
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
	
	this.dimension = 3;
	this.groups = new Array();
	this.cbList = controlBoxList;
//	console.log(controlBoxList);
	
	for (var i=0; i < this.cbList.length; i++) {
		this.groups[i] = new group(this.cbList[i].groupBoxes);
//		console.log(this.groups[i]);
	};
	
//	this.groups[0] = new group("yellow");
//	this.groups[1] = new group("blue");
//	this.groups[2] = new group("green");
//	this.groups[3] = new group("red");
//	this.groups[4] = new group("orange");
//	this.groups[5] = new group("white");
	
}

rubiXCubeLogic.prototype = {
		
	helloWorld: function() {
		return 'helloWorld';
	},
	
	updateControlBoxes: function() {
		// TODO: groups to (control)boxes
		for (var i=0; i < this.groups.length; i++) {
			var group = this.groups[i];
			var controlbox = this.cbList[i];
			controlbox.changeGroupBoxList(group.elements);
		}
	},
		
	// http://www.rubiks.com/world/games/flat_cube.php
	// g1,g2,g3,g4,loc1,loc2,loc3,loc4
	moveThrue: function(gArray,locArray,revArray) { //,revArray
		var arrOfArrays = new Array(4);
		
		// store local variables
		for (var i = 0; i < 4; i++) {
			var loc = locArray[i];
			var g = this.groups[gArray[i]];
			var reverse = revArray[i];
			
			if (loc == "r1") {
				arrOfArrays[i] = g.getRow(1);
			} else if (loc == "r2") {
				arrOfArrays[i] = g.getRow(2);
			} else if (loc == "r3") {
				arrOfArrays[i] = g.getRow(3);
			} else if (loc == "c1") {
				arrOfArrays[i] = g.getColumn(1);
			} else if (loc == "c2") {
				arrOfArrays[i] = g.getColumn(2);
			} else if (loc == "c3") {
				arrOfArrays[i] = g.getColumn(3);
			} else {
				// error;
			}
			
			if (reverse == "rev") {
				arrOfArrays[i].reverse();
			}
		}
		
		// change elements of groups
		for (var i = 0; i < 4; i++) {
			var g = this.groups[gArray[i]];
			var loc = locArray[i];
			
			if (loc == "r1") {
				g.changeXthRow(arrOfArrays[(i+3) % 4],1);
			} else if (loc == "r2") {
				g.changeXthRow(arrOfArrays[(i+3) % 4],2);
			} else if (loc == "r3") {
				g.changeXthRow(arrOfArrays[(i+3) % 4],3);
			} else if (loc == "c1") {
				g.changeXthColumn(arrOfArrays[(i+3) % 4],1);
			} else if (loc == "c2") {
				g.changeXthColumn(arrOfArrays[(i+3) % 4],2);
			} else if (loc == "c3") {
				g.changeXthColumn(arrOfArrays[(i+3) % 4],3);
			} else {
				// error;
			}
		}
		
	},
	
	rotateMiddleRows: function(Nb, direction) {
		var gArray = [];
		var locArray = [];
		var revArray = [];
		
		switch(Nb) {
		case "z":
			if (direction == "left") {
				gArray = [3,2,1,0];
				locArray = ["r2","r2","r2","r2"];
				revArray = ["ok", "ok", "ok", "ok"];
			} else if (direction == "right") {
				gArray = [0,1,2,3];
				locArray = ["r2","r2","r2","r2"];
				revArray = ["ok", "ok", "ok", "ok"];
			}
			break;
		case "x":
			if (direction == "left") {
				gArray = [0,5,2,4];
				locArray = ["c2","c2","r2","c2"];
				revArray = ["rev", "ok", "ok", "rev"];
			} else if (direction == "right") {
				gArray = [4,2,5,0];
				locArray = ["c2","r2","c2","c2"];
				revArray = ["ok", "ok", "rev", "rev"];
			}
			break;
		case "y":
			if (direction == "left") {
				gArray = [4,1,5,3];
				locArray = ["c2","c2","r2","c2"];
				revArray = ["ok", "ok", "rev", "rev"];
			} else if (direction == "right") {
				gArray = [3,5,1,4];
				locArray = ["c2","r2","c2","c2"];
				revArray = ["rev", "ok", "ok", "rev"];
			}
			break;
		}
		this.moveThrue(gArray, locArray, revArray);
	},
		
	rotateGroup: function(Nb, direction) {
		var gArray = [];
		var locArray = [];
		var revArray = [];
		switch(Nb) {
			case 0:
	//			console.log("case 0");
				if (direction == "left") {
					this.groups[0].rotateLeft();
					gArray = [3,5,1,4];
					locArray = ["c3","r3","c1","c1"];
					revArray = ["rev","ok","ok","rev"]; //TODO
					
				} else if (direction == "right") {
					this.groups[0].rotateRight();
					gArray = [4,1,5,3];
					locArray = ["c1","c1","r3","c3"];
					revArray = ["ok", "ok", "rev", "rev"];
				}
				break;
			case 1:
				if (direction == "left") {
					this.groups[1].rotateLeft();
					gArray = [5,2,4,0];
					locArray = ["c1","c1","r3","c3"];
					revArray = ["ok","ok", "rev", "rev"];
				} else if (direction == "right") {
					this.groups[1].rotateRight();
					gArray = [0,4,2,5];
					locArray = ["c3","r3","c1","c1"];
					revArray = ["rev", "ok", "ok", "rev"];
				}
				break;
			case 2:
				if (direction == "left") {
					this.groups[2].rotateLeft();
					gArray = [4,1,5,3];
					locArray = ["c3","c3","r1","c1"];
					revArray = ["ok", "ok", "rev", "rev"];
				} else if (direction == "right") {
					this.groups[2].rotateRight();
					gArray = [3,5,1,4];
					locArray = ["c1","r1","c3","c3"];
					revArray = ["rev", "ok", "ok", "rev"];
				}
				break;
			case 3:
				if (direction == "left") {
					this.groups[3].rotateLeft();
					gArray = [2,5,0,4];
					locArray = ["c3","c3","c1","r1"];
					revArray = ["ok", "rev", "rev", "ok"];
				} else if (direction == "right") {
					this.groups[3].rotateRight();
					gArray = [5,2,4,0];
					locArray = ["c3","c3","r1","c1"];
					revArray = ["ok", "ok","rev","rev"];
				}
				break;
			case 4:
				if (direction == "left") {
					this.groups[4].rotateLeft();
					gArray = [0,1,2,3];
					locArray = ["r1","r1","r1","r1"];
					revArray = ["ok", "ok", "ok", "ok"];
				} else if (direction == "right") {
					this.groups[4].rotateRight();
					gArray = [3,2,1,0];
					locArray = ["r1","r1","r1","r1"];
					revArray = ["ok", "ok", "ok", "ok"];
				}
				break;
			case 5:
				if (direction == "left") {
					this.groups[5].rotateLeft();
					gArray = [3,2,1,0];
					locArray = ["r3","r3","r3","r3"];
					revArray = ["ok", "ok", "ok", "ok"];
				} else if (direction == "right") {
					this.groups[5].rotateRight();
					gArray = [0,1,2,3];
					locArray = ["r3","r3","r3","r3"];
					revArray = ["ok", "ok", "ok", "ok"];
				}
				break;
		}
//		console.log(gArray);
//		console.log(locArray);
//		console.log(revArray);
		this.moveThrue(gArray, locArray, revArray);
	}
	
};