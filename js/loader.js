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
        Game.stage.backgroundColor = "#023";
        this.start=Game.load.image("startB","../../media/botones/start.png");
        //this.start.scale.setTo(0.5);
        Game.load.image("mute","../media/botones/sound.png",1);
        Game.load.image("mute","../media/botones/mute.png",0);
        Game.load.image("option","../media/botones/opciones.png");
        Game.load.image("progressBar", "../media/image/progressBar.png");
        var loadingLabel = Game.add.text(Game.world.centerX, 150, 'loading...',{ font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = Game.add.sprite(Game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        Game.load.setPreloadSprite(progressBar);
    }

    Loader.prototype.create = function () {
        Game.state.add('Menu', new Menu());
        Game.state.start('Menu');
    }

    return Loader;
});