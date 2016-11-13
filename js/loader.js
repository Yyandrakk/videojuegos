/**
 * Created by oscar on 13/11/16.
 */
define(['Game','estados/menu'], function (Game,Menu) {
    return {
        start: function () {
            Game.state.add('Menu', new Menu());
            Game.state.start('Menu');
        }
    }
});