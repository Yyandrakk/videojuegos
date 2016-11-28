/**
 * Created by oscar on 13/11/16.
 */
define(['Phaser','Game','estados/laberinto'], function (Phaser,Game,Laberinto) {
    function Menu() {
        Phaser.State.call(this);
        this.optionGrupo=null;
        this.soundBoton=null;
    }
//Inheritance
    Menu.prototype = Object.create(Phaser.State.prototype);
    Menu.prototype.constructor = Menu;
    /* download assets code here */
    Menu.prototype.preload = function () {
       //Cargar el mundo inicial
        Game.load.image('tileMP1', '../media/tileset/Hyptosis/hyptosis_tile-art-batch-1.png');
        Game.load.image('tileMP2', '../media/tileset/Hyptosis/hyptosis_til-art-batch-2.png');
        Game.load.image('tora_vx_02', '../media/tileset/tora_vx_02.png');
        Game.load.image('mountain_landscape', '../media/tileset/mountain_landscape.png');
        Game.load.tilemap('mapP', "../media/map/mapaPrincipal.json", null,Phaser.Tilemap.TILED_JSON);
        Game.load.tilemap('mapLab', "../media/map/minijuego_laberinto.json", null, Phaser.Tilemap.TILED_JSON);
        Game.load.spritesheet('player', '../media/sprite/joker1.png',  32, 32);
        Game.load.spritesheet('dog', '../media/sprite/dog.png',  32, 32);



    }
    function mostrarMenu(){
        if(this.optionGrupo.y == 0){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: -50
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
        if(this.optionGrupo.y == -50){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }
    /* initialize persistent game objects here */
    Menu.prototype.create = function () {

        var nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY-100, 'EPS WARRIOR');
        nameLabel.anchor.setTo(0.5, 0.5);
        var startBo = Game.add.button(Game.world.centerX, Game.world.centerY, "startB", empezar,this);
        startBo.scale.setTo(0.5,0.5);
        startBo.anchor.set(0.5);


        this.optionGrupo = Game.add.group();
        var optionBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 140, "option",mostrarMenu,this);
        optionBoton.scale.setTo(0.5,0.5);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);
        this.soundBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 200, "mute",toggleSound,this);
        this.soundBoton.frame=1;
        this.soundBoton.scale.setTo(0.5,0.5);
        this.soundBoton.anchor.set(0.5);
        this.soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(this.soundBoton);

    }

    function empezar() {
        Game.physics.startSystem(Phaser.Physics.ARCADE);
        Game.state.add('Laberinto', new Laberinto());
        Game.state.start('Laberinto');
    }


    return Menu;


});