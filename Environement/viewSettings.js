//bij middelmuis knop, gebruik sheetengine.transforms

function viewSettings(canvasObject) {
	
//	sheetengine.drawObjectContour = true;
//	sheetengine.SheetObject.prototype.newCenterp = sheetengine.SheetObject.centerp;
	
	var selectedObjects = [];
	var canvasChanged = false;
	this.timeoutTime = 30;
	this.dragok = false;
	this.canvasObject = canvasObject;
	this.ce = canvasObject.myCanvasElement;
	var canvasEl = this.ce;
	this.co = canvasEl.getContext('2d');
	this.bufferCanvasElement = canvasObject.bufferCanvas;
	this.bufferContext = canvasObject.bufferContext;
	
	// TODO performance: bereken alle coordinaten voor alle selectables (niet constant forlussen)
	var hoverFunction = function(event) {
		// get the hover coordinates
		var puv = { // NIET: event.clientX
			    u:event.pageX - sheetengine.canvas.offsetLeft, 
			    v:event.pageY - sheetengine.canvas.offsetTop
		};
		  // TODO: performance: enkel bovenste vlak van object beschouwen!
		  for(var i = 0; i < canvasEl.selectableObjects.length; i++) {
			  // check if the object has been hovered
			  var thisBox = canvasEl.selectableObjects[i];
			  var objhovered = thisBox.isObjectHovered(puv);
			  var objGlow = thisBox.glowing;
			  var objSelected = thisBox.selected;
			  
			  //TODO: slechts 1 tegelijk mogelijk! (eerste?)
			  if (objhovered && !objGlow && !objSelected) {
				  //EERST alle andere glows verwijderen (optimaliseren!)
				  for(var j = 0; j < canvasEl.selectableObjects.length; j++) {
					  if (canvasEl.selectableObjects[j] != thisBox) {
						  var otherbox = canvasEl.selectableObjects[j];
						  var otherGlow = otherbox.glowing;
						  var otherSelected = otherbox.selected;
						  if (otherGlow && !otherSelected) {
							  otherbox.objRemoveGlow();
						  }
					  }
				  }
				  
				  //DAN glow toevoegen
				  thisBox.objGlow();
				  canvasChanged = true;
				  break; //slechts 1 tegelijk mogelijk! (eerste?)
			  } 
			  else if (!objhovered && objGlow && !objSelected) {
				  thisBox.objRemoveGlow();
				  canvasChanged = true;
			  }
		  }
		  if (canvasChanged) {
			  updateEntireView();
			  canvasChanged = false;
		  }
		  
	};
		
	var onclickFunction = function(event) {
		// remove all selected, before adding new ones
		  var puv = {
		    u:event.pageX - sheetengine.canvas.offsetLeft, 
		    v:event.pageY - sheetengine.canvas.offsetTop
		  };
		  for(var i = 0; i < selectedObjects.length; i++) {
				selectedObjects[i].unselect();
		  }
		  selectedObjects = [];
		  this.onmousemove = hoverFunction;
		  for(var i = 0; i < canvasEl.selectableObjects.length; i++) {
			  
			  // check if the object has been hovered
			  var thisObject = canvasEl.selectableObjects[i];
			  var objhovered = thisObject.isObjectHovered(puv);
			  
			  if (objhovered) {
				  thisObject.select();
				  selectedObjects.push(thisObject);
				  this.onmousemove = null;
				  break;
			  } 
		  }
		  updateEntireView();
	};
	
	var onMouseUpFunction = function(event) {
		this.dragok = false;
		this.onmousemove = hoverFunction;
		this.onmousup = null;
		mouseIsDown = false;
		sheetengine.canvasdirty = false;
	};
		
	this.ce.onclick = onclickFunction;
		
	this.ce.onmouseup = null;
	
	this.ce.onmousemove = hoverFunction;
	
	// ROTATE VIEW
	this.ce.onmousedown = function(event) {
		if (this.viewAccess && ((event.button & 4) || event.which == 2)) { // http://javascript.info/tutorial/mouse-events#mouse-event-types
			mouseIsDown = true;
			this.onmouseup = onMouseUpFunction;
			// get the hover coordinates
			var puv = {
				u : event.pageX - sheetengine.canvas.offsetLeft + pageXOffset,
				v : event.pageY - sheetengine.canvas.offsetTop + pageYOffset
			};
			// search on drag-and-drop!
			// http://html5.litten.com/how-to-drag-and-drop-on-an-html5-canvas/
			this.dragok = true;
			canvasEl.onmousemove = function(e) {
//				sheetengine.canvasdirty = true;
				if (this.dragok && this.viewAccess) {
//					console.log(puv.u + " " + puv.v);
					var pxy = {
							x: e.pageX - canvasEl.offsetLeft,
							y: e.pageY - canvasEl.offsetTop
					};
					
					for ( var i = 0; i < sheetengine.objects.length; i++) {
						var obj = sheetengine.objects[i];
						
						for ( var j = 0; j < obj.sheets.length; j++) {
							var mySheet = obj.sheets[j];
							
							if (Math.abs(puv.u - pxy.x) > Math.abs(puv.v - pxy.y)) {
								// rond de z-as						
								obj.rotateSheet(mySheet, { // TODO: rotatiecentrum aanpassen tov centrum cube
									x : -obj.centerp.x,
									y : -obj.centerp.y,
									z : 0
								}, {
									x : 0,
									y : 0,
									z : 1
								}, (puv.u - pxy.x)/100); //aan te passen.
							} else {
//								 rond de u-as
								obj.rotateSheet(mySheet, { // TODO: rotatiecentrum aanpassen tov centrum cube
									x : -obj.centerp.x,
									y : -obj.centerp.y,
									z : -obj.centerp.z
								}, {
									x : Math.SQRT2 / 2,
									y : - Math.SQRT2 /2,
									z : 0
								}, (puv.v - pxy.y)/100);
							}
						}
					}
					
					
					// DRAW
//					requestAnimationFrame(updateFunction);
					updateEntireView(); //TODO: enkel updaten om de zoveel seconden!
//					sheetengine.calc.calculateChangedSheets();
					
					puv.u = pxy.x;
					puv.v = pxy.y;
				}
			};	
		}
	};
	
	this.lockSelect = function() {
		this.ce.onclick = null;
	};
	
	this.unlockSelect = function() {
		this.ce.onclick = onclickFunction;
	};
	
};

viewSettings.prototype = {
		
};