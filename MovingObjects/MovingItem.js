
function MovingItem(x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.obj = null;
	this.sheets = [];
	this.frontSheets = []; //TODO: implementeren
	this.glowing = false;
	this.selected = false;
	
	this.glowStyle = "#99F";
	this.selectStyle = "rgb(255,255,0)";
	
	this.BLACKBORDERWIDTH = 2;
}

/**
 * http://www.dzone.com/snippets/point-inside-polygon
 * 
 * @param poly
 * @param pt
 * @returns {Boolean}
 */
MovingItem.prototype.isPointInPoly = function(poly, pt){
	for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i].v <= pt.v && pt.v < poly[j].v) || (poly[j].v <= pt.v && pt.v < poly[i].v))
		&& (pt.u < (poly[j].u - poly[i].u) * (pt.v - poly[i].v) / (poly[j].v - poly[i].v) + poly[i].u)
		&& (c = !c);
	return c;
};

MovingItem.prototype.isObjectHovered = function(puv) {
//	MovingItem.prototype.isObjectHovered.call(this);
	for (var i = 0; i < this.frontSheets.length; i++) {
		if (this.isPointInPoly(this.frontSheets[i].data.cornersuv, puv))
			return true;
	}
	return false;
};

MovingItem.prototype.objGlow = function() {
	if (this.obj != null) { // && !this.obj.selected
		var length = this.obj.sheets.length;
		for (var i = 0; i < length ; i++) {
			var sheet = this.obj.sheets[i];
			sheet.context.lineWidth = 5;
			sheet.context.strokeStyle = this.glowStyle;
			sheet.context.strokeRect(0,0,sheet.width,sheet.height);
			sheet.canvasChanged();
		}
		this.glowing = true;
	}
};

MovingItem.prototype.objRemoveGlow = function() {
	if (this.obj != null) { //  && !this.obj.selected
		if (this.selected) {
			this.select();
		} else {
			var length = this.obj.sheets.length;
			for (var i = 0; i < length ; i++) {
				var sheet = this.obj.sheets[i];
				sheet.context.lineWidth = 6;
				sheet.context.strokeStyle = sheet.context.fillStyle;
				sheet.context.strokeRect(0,0,sheet.width,sheet.height);
				sheet.context.lineWidth = this.BLACKBORDERWIDTH;
				sheet.context.strokeStyle = "black";
				sheet.context.strokeRect(0,0,sheet.width,sheet.height);
				sheet.canvasChanged();
			}
		}
		this.glowing = false;
	}
};

MovingItem.prototype.select = function() {
	if (this.obj != null) {
		var length = this.obj.sheets.length;
		for (var i = 0; i < length ; i++) {
			var sheet = this.obj.sheets[i];
			sheet.context.lineWidth = 5;
			sheet.context.strokeStyle = this.selectStyle;
			sheet.context.strokeRect(0,0,sheet.width,sheet.height);
			sheet.canvasChanged();
		}
		this.selected = true;
		this.glowing = false;
	}
};

MovingItem.prototype.unselect = function() {
	if (this.obj != null) {
		var length = this.obj.sheets.length;
		for (var i = 0; i < length ; i++) {
			var sheet = this.obj.sheets[i];
			sheet.context.lineWidth = 6;
			sheet.context.strokeStyle = sheet.context.fillStyle;
			sheet.context.strokeRect(0,0,sheet.width,sheet.height);
			sheet.context.lineWidth = this.BLACKBORDERWIDTH;
			sheet.context.strokeStyle = "black";
			sheet.context.strokeRect(0,0,sheet.width,sheet.height);
			sheet.canvasChanged();
		}
		this.selected = false;
		this.glowing = false;
	}
}