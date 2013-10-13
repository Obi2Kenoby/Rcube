MovingBox.prototype = new MovingItem();
MovingBox.prototype.constructor = MovingBox;
MovingBox.prototype.parent = MovingItem.prototype;

function MovingBox(x, y, z, l, w, h) {
	MovingItem.call(this,x,y,z,l,w,h);
//	this.x = x;
//	this.y = y;
//	this.z = z;
	this.length = l;
	this.width = w;
	this.height = h;
//	this.rotationCenter = {x:x, y:y, z:z};
	
	this.color = "grey";
	
	this.sheet1 = new sheetengine.Sheet({x:0, y:l/2, z:0}, {alphaD:0, betaD:0, gammaD:0}, {w:w, h:h});
	this.sheet1.context.fillStyle = this.color;
	this.sheet1.context.fillRect(0,0,this.sheet1.width,this.sheet1.height);
	
	this.sheet2 = new sheetengine.Sheet({x:w/2, y:0, z:0}, {alphaD:0, betaD:0, gammaD:90}, {w:l, h:h});
	this.sheet2.context.fillStyle = this.color;
	this.sheet2.context.fillRect(0,0,this.sheet2.width,this.sheet2.height);
	
	this.sheet3 = new sheetengine.Sheet({x:0, y:0, z:h/2}, {alphaD:90, betaD:0, gammaD:0}, {w:w, h:l});
	this.sheet3.context.fillStyle = this.color;
	this.sheet3.context.fillRect(0,0,this.sheet3.width,this.sheet3.height);
	
	this.sheet4 = new sheetengine.Sheet({x:0, y:-l/2, z:0}, {alphaD:0, betaD:0, gammaD:0}, {w:w, h:h});
	this.sheet4.context.fillStyle = this.color;
	this.sheet4.context.fillRect(0,0,this.sheet4.width,this.sheet4.height);
	
	this.sheet5 = new sheetengine.Sheet({x:-w/2, y:0, z:0}, {alphaD:0, betaD:0, gammaD:90}, {w:l, h:h});
	this.sheet5.context.fillStyle = this.color;
	this.sheet5.context.fillRect(0,0,this.sheet5.width,this.sheet5.height);
	
	this.sheet6 = new sheetengine.Sheet({x:0, y:0, z:-h/2}, {alphaD:90, betaD:0, gammaD:0}, {w:w, h:l});
	this.sheet6.context.fillStyle = this.color;
	this.sheet6.context.fillRect(0,0,this.sheet6.width,this.sheet6.height);
	
	this.canvasSize = {w:l+w,h:h*2,relu:(l+w)/2,relv:(h*2)/2};
	
	this.obj = new sheetengine.SheetObject(
			{x:x, y:y, z:z}, 
			{alphaD:0, betaD:0, gammaD:0}, 
			[this.sheet1, this.sheet2, this.sheet3, this.sheet4, this.sheet5, this.sheet6], 
			this.canvasSize);
	this.obj.setShadows(false, false);
	this.sheets = this.obj.sheets;
	
	this.drawContours();
	
//	console.log(this.obj.centerpuv.u + " " + this.obj.centerpuv.v);
}

MovingBox.prototype.drawContours = function() {
	for (var i = 0; i < this.sheets.length; i++) {
		var sheet = this.sheets[i];
		sheet.context.lineWidth = this.BLACKBORDERWIDTH;
		sheet.context.strokeStyle = "black";
		sheet.context.strokeRect(0,0,sheet.width,sheet.height);
	}
};

MovingBox.prototype.setSheetColor = function(sheetNb, color) {
	var sheet = null;
	switch (sheetNb) {
	case 1:
		sheet = this.sheet1;
		break;
	case 2:
		sheet = this.sheet2;
		break;
	case 3:
		sheet = this.sheet3;
		break;
	case 4:
		sheet = this.sheet4;
		break;
	case 5:
		sheet = this.sheet5;
		break;
	case 6:
		sheet = this.sheet6;
		break;
	}
	sheet.context.fillStyle = color;
	sheet.context.fillRect(0,0,sheet.width,sheet.height);
	
	this.drawContours();
};

MovingBox.prototype.hideAllSheetsExceptFromObject = function(sheet) {
	for (var i = 0; i < this.sheets.length; i++) {
		if (sheet !== this.sheets[i]) {
			this.sheets[i].hidden = true;
		}
	}
};

MovingBox.prototype.getCurrentCenter = function() {
	var xValue = 0;
	var yValue = 0;
	var zValue = 0;
		
	// voor ieder object, gemiddelde van 6 zijden
	for ( var j = 0; j < this.sheets.length; j++) {
		var mySheet = this.sheets[j];
		xValue += mySheet.centerp.x;
		yValue += mySheet.centerp.y;
		zValue += mySheet.centerp.z;
	}
	return {x: xValue/6.0, y: yValue/6.0, z: zValue/6.0 };
};

MovingBox.prototype.getNormalizedVectorToCenter = function() {
	var xValue = 0;
	var yValue = 0;
	var zValue = 0;
		
	// voor ieder object, gemiddelde van 6 zijden
	for ( var j = 0; j < this.sheets.length; j++) {
		var mySheet = this.sheets[j];
		xValue += mySheet.centerp.x;
		yValue += mySheet.centerp.y;
		zValue += mySheet.centerp.z;
	}
	var newX = xValue/6.0;
	var newY = yValue/6.0;
	var newZ = zValue/6.0;
	var alpha = Math.sqrt((newX*newX)+(newY*newY)+(newZ*newZ));
//	console.log(newX + " " + newY + " " + newZ);
	return {x: newX/alpha, y: newY/alpha , z: newZ/alpha };
};

//MovingBox.prototype = {
//	rotateLeftAroundAxis: function(axis) {
//		
//		for (var j = 0; j < this.sheets.length; j++) {
//			var mySheet = this.obj.sheets[j];
//			
//			this.obj.rotateSheet(mySheet, {
//				x: 
//			}
//					
//			);
//		}
//		
//	}	
//};

//MovingBox.prototype.isObjectHovered = function(puv) {
//	return this.parent.isObjectHovered.call(this, puv);
//};

/**
 * http://www.dzone.com/snippets/point-inside-polygon
 * 
 * @param poly
 * @param pt
 * @returns {Boolean}
 */
//MovingBox.prototype.isPointInPoly = function(poly, pt){
//	return this.parent.isPointInPoly.call(this, poly, pt);
//};

//MovingBox.prototype.objGlow = function() {
//	this.parent.objGlow.call(this);
//};

//MovingBox.prototype.objRemoveGlow = function() {
//	this.parent.objRemoveGlow.call(this);
//};

//MovingBox.prototype.recalculateCanvasSize = function() {
//	this.obj.canvasSize.relu = (l+w)/2;
//	this.obj.canvasSize.relv = (h*2)/2;
//};




