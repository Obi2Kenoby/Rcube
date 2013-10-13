controlBox.prototype = new MovingBox();
controlBox.prototype.constructor = controlBox;
controlBox.prototype.parent = MovingBox.prototype;

function controlBox(x, y, z, l, w, h, groupNb, patternList) {
	MovingBox.call(this,x,y,z,l,w,h);
	var self = this;
	self.groupBoxes = [];
	self.groupNumber = groupNb;
	self.pattern = patternList[groupNb];
	
	if (groupNb == 0) {
		self.frontSheets.push(this.sheet1);
		self.hideAllSheetsExceptFromObject(this.sheet1);
		self.pattern = "yellow";
	} else if (groupNb == 1) {
		self.frontSheets.push(this.sheet2);
		self.hideAllSheetsExceptFromObject(this.sheet2);
		self.pattern = "blue";
	} else if (groupNb == 2) {
		self.frontSheets.push(this.sheet4);
		self.hideAllSheetsExceptFromObject(this.sheet4);
		self.pattern = "green";
	} else if (groupNb == 3) {
		self.frontSheets.push(this.sheet5);
		self.hideAllSheetsExceptFromObject(this.sheet5);
		self.pattern = "red";
	} else if (groupNb == 4) {
		self.frontSheets.push(this.sheet3);
		self.hideAllSheetsExceptFromObject(this.sheet3);
		self.pattern = "orange";
	} else if (groupNb == 5) {
		self.frontSheets.push(this.sheet6);
		self.hideAllSheetsExceptFromObject(this.sheet6);
		self.pattern = "white";
	} 
	
	if (patternList[groupNb] != null) {
		self.pattern = patternList[groupNb];
	}
}

controlBox.prototype.getGroupNumber = function() {
	return this.groupNumber;
};

controlBox.prototype.initGroupBoxList = function(groupBoxList) {
	this.changeGroupBoxList(groupBoxList);
	
	// color initial groupBoxes
	for (var i = 0; i < groupBoxList.length; i++) {
		if (this.groupNumber == 0) {
			groupBoxList[i].setSheetColor(1, this.pattern);
		} else if (this.groupNumber == 1) {
			groupBoxList[i].setSheetColor(2, this.pattern);
		} else if (this.groupNumber == 2) {
			groupBoxList[i].setSheetColor(4, this.pattern);
		} else if (this.groupNumber == 3) {
			groupBoxList[i].setSheetColor(5, this.pattern);
		} else if (this.groupNumber == 4) {
			groupBoxList[i].setSheetColor(3, this.pattern);
		} else if (this.groupNumber == 5) {
			groupBoxList[i].setSheetColor(6, this.pattern);
		} 
	}
};
		
//  Has to contain this controlBox object itself!
controlBox.prototype.changeGroupBoxList = function(groupBoxList) {
	this.groupBoxes = groupBoxList;
};


/**
 * Override
 */
controlBox.prototype.objGlow = function() {
	this.parent.objGlow.call(this);
	for (var j = 0; j < this.groupBoxes.length; j++) {
		if (this.groupBoxes[j] != this) { // object zit zelf in de lijst
			this.groupBoxes[j].objGlow();
		}
	}
};

/**
 * Override
 */
controlBox.prototype.objRemoveGlow = function() {
	this.parent.objRemoveGlow.call(this);
	for (var j = 0; j < this.groupBoxes.length; j++) {
		if (this.groupBoxes[j] != this) {
			this.groupBoxes[j].objRemoveGlow();
		}
	}
};

/**
 * Override
 */
controlBox.prototype.select = function() {
	this.parent.select.call(this);
//	console.log("groupBoxes list length: " + this.groupBoxes.length);
	for (var j = 0; j < this.groupBoxes.length; j++) {
		if (this.groupBoxes[j] != this) {
			this.groupBoxes[j].select();
		}
	}
};

/**
 * Override
 */
controlBox.prototype.unselect = function() {
	this.parent.unselect.call(this);
	for (var j = 0; j < this.groupBoxes.length; j++) {
		if (this.groupBoxes[j] != this) {
			this.groupBoxes[j].unselect();
		}
	}
};

controlBox.prototype.getAllBoxes = function() {
	var list = [];

	if (this.groupBoxes.length > 0) {
		for (var i = 0; i < this.groupBoxes.length; i++) {
			list[i] = this.groupBoxes[i];
		}
	} else {
		list[0] = this;
	}
	
	return list;
};

