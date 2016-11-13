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
    /* download assets code here */
    Menu.prototype.preload = function () {

    }
    /* initialize persistent game objects here */
    Menu.prototype.create = function () {
        Game.world.setBounds(-500,-500,1000,1000);
        Game.camera.setPosition(-500,-500);
    }
    /* update movements, collisions, score here */
    Menu.prototype.update = function () {

    }
    return Menu;
});