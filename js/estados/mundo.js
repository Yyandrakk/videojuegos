/**
 * Created by oscar on 18/11/16.
 */
define(['Phaser','Game'], function (Phaser,Game) {

    function Mundo() {
        Phaser.State.call(this);
    }
//Inheritance
    Mundo.prototype = Object.create(Phaser.State.prototype);
    Mundo.prototype.constructor = Mundo;

    Mundo.prototype.preload = function () {
        //Cargar el mundo inicial



    }
    Menu.prototype.create = function () {

    }
    Menu.prototype.update = function () {

    }

    return Mundo;
});