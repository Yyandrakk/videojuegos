define(['Phaser','Game','sprites/player'], function (Phaser,Game,Player) {

    function Mundo() {
        Phaser.State.call(this);
        this.listSprites=[];
    }
//Inheritance
    Mundo.prototype = Object.create(Phaser.State.prototype);
    Mundo.prototype.constructor = Mundo;


    Mundo.prototype.preload = function () {

       //this.player = new Player(Game,Game.world.centerX, Game.world.centerY);
       //this.player.anchor.setTo(0.5, 0.5);
        //this.player.scale.setTo(0.75,0.75);




    }
    Mundo.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);
        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);
        this.player =  this.playerG.getAt(0);

       // alert(this.suelo.renderOrderID);
        //alert(this.player.renderOrderID);
        /*
        Interesante para el juego de arastrar
        this.player.inputEnabled=true;
        this.player.input.enableDrag(false,false,true);
        this.player.input.priorityID=0;*/
       // Game.physics.arcade.enable(this.player);
        Game.camera.follow(this.player);
        //this.listSprites.push(this.player);


    }
    Mundo.prototype.update = function () {
        Game.physics.arcade.collide(this.player,this.muro);
        Game.physics.arcade.collide(this.player,this.decoracion);
        this.player.update();
       /* for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }
        */

    }
    Mundo.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapP');

        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('capa muro exterior');
        this.decoracion = this.map.createLayer('decoracion');
        this.laberinto = this.map.createLayer('laberinto');
        this.minfinal = this.map.createLayer('minijuego_final');
        this.map.createFromObjects('inicio','player','player',1,true,false,this.playerG,Player);
        this.map.setCollisionBetween(1, 10000, true, this.muro);
        this.map.setCollisionBetween(1, 10000, true, this.decoracion);
        this.map.setCollisionBetween(1, 10000, true, this.minfinal);



    }
    return Mundo;
});