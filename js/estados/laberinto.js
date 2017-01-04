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
       // Game.state.add('Mundo', new Mundo());
        this.music.stop();
        Game.state.start('Mundo');
    }
    return Laberinto;
});