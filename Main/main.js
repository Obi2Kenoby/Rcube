/**
 * De opeenvolging van game acties worden hier gezet.
 * - menu's
 * - start spel
 * - - opgelost: gewonnen
 * - - reset
 * - - ...
 * - muziek/sound
 */
function main() {
	
	this.canvasObject = new canvasElement();
	this.canvasEl = this.canvasObject.myCanvasElement;
	var myGame = new game(this.canvasObject);
    
	
	// game logic
//	var i = 0;
//	var int = setInterval(function() {
//		i++;
//		
//		if (i >= 100) {
//			clearInterval(int);
//		}
////		if (sheetengine.canvasdirty) {
//			console.log(i);
//			updateEntireView();
////		}
//			
//	},30);
}

function updateView() {
	sheetengine.calc.calculateChangedSheets();
	sheetengine.drawing.drawScene();
}

function updateRotatedView() {
	sheetengine.calc.calculateChangedSheets();
	sheetengine.drawing.drawScene(true);
}

function updateEntireView() {
	sheetengine.calc.calculateAllSheets();
	sheetengine.drawing.drawScene(true);
}
 