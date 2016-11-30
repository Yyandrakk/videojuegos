/**
 * Created by oscar on 18/11/16.
 */
define(['Game','preLoader'],function (Game,PreLoader) {
    return {
        start: function () {


            Game.state.add('preLoader', new PreLoader());
            Game.state.start('preLoader');
        }
    }
});