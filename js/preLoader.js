/**
 * Created by oscar on 30/11/16.
 */
define(['Game','loader'],function (Game,Loader) {
    function PreLoader() {
        Phaser.State.call(this);
    }
    PreLoader.prototype = Object.create(Phaser.State.prototype);
    PreLoader.prototype.constructor = PreLoader;
    PreLoader.prototype.preload = function (){
        Game.load.image('progressBar', "../media/image/progressBar.png");
        Game.load.image('background', "../media/image/background.jpg");
        Game.load.image('back_menu', "../media/image/background_menu.jpg");

    }
    PreLoader.prototype.create = function () {
        Game.state.add('Loader', new Loader());
        Game.state.start('Loader');
    }
    return PreLoader;
});