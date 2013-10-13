/**
 * De game acties worden in deze klassen gezet.
 * - keypresses
 * - start game
 * - end game
 * 
 * @param canvasElement
 * @returns
 */
function game(canvasObject) {
	
	this.canvasObject = canvasObject;
	this.selectedControlBox = null;
	this.animation = true;
	var myCube = new RCube(this.canvasObject); // moet in game klasse
	myCube.setupCube();	
	updateEntireView();
	
	this.myKeyControls = new keyControls(myCube, this.animation);
	
}

game.prototype = {
		
};