var canvasElement = document.getElementById('mainCanvas');

//init dynamic canvas with a 2000x1500 pixel background buffer
sheetengine.scene.init(canvasElement, {w:2000,h:1500});

var basesheet = new sheetengine.BaseSheet({x:0,y:0,z:0}, {alphaD:90,betaD:0,gammaD:0}, {w:200,h:200});
basesheet.color = '#5D7E36';

sheetengine.calc.calculateAllSheets();

sheetengine.drawing.drawScene(true);