define(['Phaser','Game','sprites/cuadrado','estados/mundo'], function(Phaser,Game,Cuadrado,Mundo){
     
    function Puzzle(){
        Phaser.State.call(this);
        this.listSprites = [];
    }
    
	var ANCHO_PIEZA = 100, ALTO_PIEZA = 93.33333;
	var totalPiezas, grupoPiezas, aleat = [];
    //Inheritance
    Puzzle.prototype = Object.create(Phaser.State.prototype);
    Puzzle.prototype.constructor = Puzzle;
    
    Puzzle.prototype.preload = function(){
		Game.load.spritesheet("imagen", "media/sprite/cientificoloco.jpg", ANCHO_PIEZA, ALTO_PIEZA);
    }
    
    Puzzle.prototype.create = function(){
		var ind = 0, pieza, k = 0;
		
		totalPiezas = 9;
		aleat = this.crearArrayAleatorio();
		
		grupoPiezas = Game.add.group();
		for (i = 0; i < 3; i++){
			for (j = 0; j < 3; j++){
				if (aleat[ind]){
					pieza = grupoPiezas.create(j*ANCHO_PIEZA, i*ALTO_PIEZA, "imagen", aleat[ind]);
				} else {
					pieza = grupoPiezas.create(j*ANCHO_PIEZA, i*ALTO_PIEZA);
					pieza.vacia = true;
				}
				pieza.nombre = 'Pieza' + i.toString() + 'x' + j.toString();
				pieza.current = ind;
				pieza.indDest = aleat[ind];
				pieza.inputEnabled = true;
				pieza.events.onInputDown.add(this.seleccionarPieza, this);
				pieza.posX = j;
				pieza.posY = i;
				ind++;
				k++;
			}
		}
    }
	
	Puzzle.prototype.seleccionarPieza = function(pieza){
		var huecoVacio = this.vecinoVacio(pieza);
		
		if (huecoVacio){
			this.mover(pieza, huecoVacio);
		}
	}
	
	Puzzle.prototype.vecinoVacio = function(pieza){
		var vacioEncontrado = false;
		
		grupoPiezas.children.forEach(function(element){
			if (element.posX === (pieza.posX - 1) && element.posY === pieza.posY && element.vacia || 
			element.posX === (pieza.posX + 1) && element.posY === pieza.posY && element.vacia ||
			element.posY === (pieza.posY - 1) && element.posX === pieza.posX && element.vacia ||
			element.posY === (pieza.posY + 1) && element.posX === pieza.posX && element.vacia){
				vacioEncontrado = element;
				return;
			}
		});
		
		return vacioEncontrado;
	}
	
	Puzzle.prototype.mover = function(pieza, huecoVacio){
		var temp = {
			posX: pieza.posX,
			posY: pieza.posY,
			current: pieza.current
		};
		
		Game.add.tween(pieza).to({x: huecoVacio.posX * ANCHO_PIEZA, y: huecoVacio.posY * ALTO_PIEZA}, 300, Phaser.Easing.Linear.None, true);
		
		pieza.posX = huecoVacio.posX;
		pieza.posY = huecoVacio.posY;
		pieza.current = huecoVacio.current;
		pieza.nombre = 'Pieza' + huecoVacio.posX.toString() + 'x' + huecoVacio.posY.toString();
		
		huecoVacio.posX = temp.posX;
		huecoVacio.posY = temp.posY;
		huecoVacio.current = temp.current;
		huecoVacio.nombre = 'Pieza' + huecoVacio.posX.toString() + 'x' + huecoVacio.posY.toString();
		
		this.fin();
	}
	
	Puzzle.prototype.fin = function(){
		var esFin = true;
		
		grupoPiezas.children.forEach(function(element){
			if (element.current !== element.indDest){
				esFin = false;
				return;
			}
		});
		
		if (esFin){
			Game.add.text(Game.world.centerX, Game.world.centerY, "Victoria");
		}
	}
	
	Puzzle.prototype.crearArrayAleatorio = function(){
		var indArray = [];
		for (var i = 0; i < totalPiezas; i++){
			indArray.push(i);
		}
		return this.mezclar(indArray);
	}
    
	Puzzle.prototype.mezclar = function(array){
		var cont = array.length, temp, indice;
		
		while (cont > 0){
			indice = Math.floor(Math.random() * cont);
			
			cont--;
			
			temp = array[cont];
			array[cont] = array[indice];
			array[indice] = temp;
		}
		
		return array;
	}
    
    return Puzzle;
});