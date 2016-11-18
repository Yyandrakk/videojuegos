/**
 * Created by oscar on 13/11/16.
 */
define(['Phaser','Game'], function (Phaser,Game) {
    function Menu() {
        Phaser.State.call(this);
    }
//Inheritance
    Menu.prototype = Object.create(Phaser.State.prototype);
    Menu.prototype.constructor = Menu;
    Menu.prototype.optionGrupo;
    /* download assets code here */
    Menu.prototype.preload = function () {
       //Cargar el mundo inicial



    }
    Menu.prototype.mostrarMenu = function (){
        if(this.optionGrupo.y == 0){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: -180
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
        if(this.optionGrupo.y == -180){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }
    Menu.prototype.toggleSound = function() {

        Game.sound.mute = ! Game.sound.mute;

        this.muteButton.frame = Game.sound.mute ? 1 : 0;


    }
    /* initialize persistent game objects here */
    Menu.prototype.create = function () {

        var nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY-100, 'EPS WARRIOR');
        nameLabel.anchor.setTo(0.5, 0.5);
        var startBo = Game.add.button(Game.world.centerX, Game.world.centerY, "startB", function(){});
        startBo.anchor.set(0.5);


        this.optionGrupo = Game.add.group();
        var optionBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 100, "option", this.mostrarMenu);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);
        var soundBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 150, "mute", this.toggleSound);
        soundBoton.frame=0;
        soundBoton.anchor.set(0.5);
        soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(soundBoton);

    }
    /* update movements, collisions, score here */
    Menu.prototype.update = function () {

    }


    return Menu;


});