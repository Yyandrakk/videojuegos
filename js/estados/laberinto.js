define(['Phaser','Game','sprites/dog','estados/mundo','estados/gameOver'], function (Phaser,Game,Dog,Mundo,GameOver) {
    /**
     *
     * @constructor
     */
    function Laberinto() {
        Phaser.State.call(this);
        this.listSprites=[];
    }
//Inheritance
    /**
     *
     * @type {Phaser.State}
     */
    Laberinto.prototype = Object.create(Phaser.State.prototype);
    Laberinto.prototype.constructor = Laberinto;


    Laberinto.prototype.preload = function () {
        this.createWorld();
        this.dog = new Dog(Game);
        this.dog.anchor.setTo(0.5, 0.5);

        this.dog.scale.setTo(0.6,0.6);
        this.listSprites.push(this.dog);
        Game.physics.arcade.enable(this.dog);
        this.listSprites.push(this.dog);
		Game.state.add('GameOver', new GameOver());
    }
    Laberinto.prototype.create = function () {
        Game.world.setBounds(0,0,30*32,30*32);
        this.dog.position.x = 80;
        this.dog.position.y = 810;
        Game.camera.follow(this.dog);
        Game.global.control.laberinto.vidas = 3;
        this.numVidas = this.game.add.text(30, 30, 'Vidas: 3',{ font: '18px Arial', fill: '#ffffff' });
        this.numVidas.fixedToCamera = true;
        this.deathSound = this.game.add.audio('dogdeath');
        this.music = this.game.add.audio('mazemusic');
        this.music.loop = true;
        this.music.play();
        this.load_boton();
    }
    Laberinto.prototype.update = function () {
        Game.physics.arcade.collide(this.dog,this.arboles, this.dogDie, null, this);
        Game.physics.arcade.collide(this.dog,this.objetivo, this.levelCompleted, null, this);
        for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }

    }
    /**
     *
     */
    Laberinto.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapLab', tileWidth=50, tileHeight=50);
        
        this.map.addTilesetImage('tora_vx_02');
        this.map.addTilesetImage('mountain_landscape');

        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.arboles = this.map.createLayer('Capa Arboles');
        this.objetivo = this.map.createLayer('Capa Objetivo');
        this.map.setCollisionBetween(1, 10000, true, this.arboles);
        this.map.setCollisionBetween(1, 10000, true, this.objetivo);


    }
    /**
     *
     */
    Laberinto.prototype.dogDie = function() {
        this.dog.position.x = 80;
        this.dog.position.y = 810;
        Game.global.control.laberinto.vidas -= 1;
        this.numVidas.text = 'Vidas: ' + Game.global.control.laberinto.vidas;
        if (Game.global.control.laberinto.vidas < 0){
            Game.state.start('GameOver');
            this.music.stop();
            //Game.state.start('Mundo');

        }
        this.deathSound.play();
    }
    /**
     *
     */
    Laberinto.prototype.levelCompleted = function() {
        Game.global.control.laberinto.haGanado = true;
        this.music.stop();
        Game.state.start('Mundo');
    }

    /**
     * Se encarga de generar los botones en su sitio
     */
    Laberinto.prototype.load_boton=function () {

        this.optionGrupo = Game.add.group();
        this.optionGrupo.fixedToCamera=true;
        this.optionGrupo.cameraOffset.setTo( 0,0);

        var optionBoton = Game.add.button( Game.width-30,Game.height-30, "option",mostrarMenu,this);
        optionBoton.scale.setTo(0.5,0.5);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);

        this.soundBoton = Game.add.button(Game.width-30, Game.height +30, "mute",toggleSound,this);
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;
        this.soundBoton.scale.setTo(0.5,0.5);
        this.soundBoton.anchor.set(0.5);
        this.soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(this.soundBoton);


        this.quitJuego = Game.add.button(Game.width-30, Game.height +90, "salir",salirMenu,this);
        this.quitJuego.scale.setTo(0.5,0.5);
        this.quitJuego.anchor.set(0.5);
        this.quitJuego.input.useHandCursor = true;
        this.optionGrupo.add( this.quitJuego);
    }

    /**
     * Se encarga de mostrar o ocultar el resto de botones cuando se da al de opciones
     */
    function mostrarMenu(){

        if(this.optionGrupo.cameraOffset.y == 0){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: -120
            }, 500, Phaser.Easing.Bounce.Out, true);

        }
        if(this.optionGrupo.cameraOffset.y == -120){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }

    /**
     * Pone o quita el sonido
     */
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }

    /**
     * Accion cuando se pulsa el boton de salir, vuelves al menu de inicio, reiniciando el juego
     */
    function salirMenu() {
        if (confirm("¿Esta seguro de que quiere salir al menu?")) {
            for (var mini in Game.global.control) {
                mini.haGanado = false
            }
            this.music.stop();
            Game.state.start('Menu');
        }
    }
    return Laberinto;
});