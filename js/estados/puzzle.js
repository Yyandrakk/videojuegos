define(['Phaser','Game','estados/mundo'], function(Phaser,Game,Mundo){
    /**
	 *
     * @constructor
     */
    function Puzzle(){
        Phaser.State.call(this);
        this.listSprites = [];
    }

    /**
	 *
     * @type {number}
     */
	var ANCHO_PIEZA = 100, ALTO_PIEZA = 93.33333;
    /**
	 *
     */
	var totalPiezas, grupoPiezas, aleat = [];
    //Inheritance
    Puzzle.prototype = Object.create(Phaser.State.prototype);
    Puzzle.prototype.constructor = Puzzle;
    
    Puzzle.prototype.preload = function(){
		Game.load.spritesheet("imagen", "media/sprite/cientificoloco.jpg", ANCHO_PIEZA, ALTO_PIEZA);
		Game.load.audio('puzzle_music', ['media/sound/Puzzle Solving.mp3']);
		Game.load.audio('sliding_sound', ['media/sound/Sliding.mp3', 'media/sound/Sliding.wav']);
    }
    
    Puzzle.prototype.create = function(){
		var ind = 0, pieza, k = 0;
		
		this.music = this.game.add.audio('puzzle_music');
		this.moverSound = this.game.add.audio('sliding_sound');
        this.music.loop = true;
        this.music.play();
		
		this.load_boton();
		
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
    /**
	 *
     * @param pieza
     */
	Puzzle.prototype.seleccionarPieza = function(pieza){
		var huecoVacio = this.vecinoVacio(pieza);
		
		if (huecoVacio){
			this.mover(pieza, huecoVacio);
		}
	}
    /**
	 *
     * @param pieza
     * @returns {boolean}
     */
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
    /**
	 *
     * @param pieza
     * @param huecoVacio
     */
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
		
		this.moverSound.play();
		
		this.fin();
	}
    /**
	 *
     */
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
			this.music.stop();
			Game.global.control.puzzle.haGanado = true;
		}
	}
    /**
	 *
     */
	Puzzle.prototype.crearArrayAleatorio = function(){
		var indArray = [];
		for (var i = 0; i < totalPiezas; i++){
			indArray.push(i);
		}
		return this.mezclar(indArray);
	}
    /**
	 *
     * @param array
     * @returns {*}
     */
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
    /**
	 *
     */
	Puzzle.prototype.load_boton=function () {

        this.optionGrupo = Game.add.group();
        this.optionGrupo.fixedToCamera=true;
        this.optionGrupo.cameraOffset.setTo( 0,0);

        var optionBoton = Game.add.button( Game.width-80,Game.height-50, "option",mostrarMenu,this);
        optionBoton.scale.setTo(0.5,0.5);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);

        this.soundBoton = Game.add.button(Game.width-80, Game.height +30, "mute",toggleSound,this);
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;
        this.soundBoton.scale.setTo(0.5,0.5);
        this.soundBoton.anchor.set(0.5);
        this.soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(this.soundBoton);
    }
    /**
	 *
     */
    function mostrarMenu(){
        game.paused=!game.paused;
        if(this.optionGrupo.cameraOffset.y == 0){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: -60
            }, 500, Phaser.Easing.Bounce.Out, true);

        }
        if(this.optionGrupo.cameraOffset.y == -60){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);

        }
    }

    /**
	 *
     */
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }
    
    return Puzzle;
});