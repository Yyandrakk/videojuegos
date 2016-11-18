/**
 * Created by oscar on 18/11/16.
 */
define(['Game','loader'],function (Game,Loader) {
    return {
        start: function () {
            Game.state.add('Loader', new Loader());
            Game.state.start('Loader');
        }
    }
});