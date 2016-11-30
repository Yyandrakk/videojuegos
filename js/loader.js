/**
 * Created by oscar on 13/11/16.
 */
define(['Phaser','Game','estados/menu'], function (Phaser,Game,Menu) {
    function Loader() {
        Phaser.State.call(this);
    }
    Loader.prototype = Object.create(Phaser.State.prototype);
    Loader.prototype.constructor = Loader;

    Loader.prototype.preload = function (){
        Game.physics.startSystem(Phaser.Physics.ARCADE);
       // Game.stage.backgroundColor = "#023";
        Game.add.image(0, 0, 'background');
        this.start=Game.load.image("startB","../../media/botones/start.png");
        //this.start.scale.setTo(0.5);
        Game.load.spritesheet('mute', "../media/botones/sonido_mute.png", 128, 128);

        Game.load.image("option","../media/botones/opciones.png");

        var loadingLabel = Game.add.text(Game.world.centerX, 150, 'loading...',{ font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = Game.add.sprite(Game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        Game.load.setPreloadSprite(progressBar);
        Game.load.audio('dogdeath', ['../../media/sound/DogDeath.mp3', '../../media/sound/DogDeath.wav']);
        Game.load.audio('mazemusic', ['../../media/sound/Fire.mp3', '../../media/sound/Fire.wav']);
        Game.load.audio('mundo_music', '../../media/sound/Heroic_Demise_(New).mp3');
        Game.load.audio('menu_music', '../../media/sound/prologue.mp3');

    }

    Loader.prototype.create = function () {
        Game.state.add('Menu', new Menu());
        Game.state.start('Menu');
    }

    return Loader;
});