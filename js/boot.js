/**
 * Funcion JS que inicializa los estados en el juego
 */
define(['Game','preLoader'],function (Game,PreLoader) {
    return {
        start: function () {


            Game.state.add('preLoader', new PreLoader());
            Game.state.start('preLoader');
        }
    }
});