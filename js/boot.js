/**
 * Created by oscar on 18/11/16.
 */
define(['Game','loader'],function (Game,Loader) {
    return {
        start: function () {
            //Game.load.image('progressBar', "../media/image/progressBar.png");

            Game.state.add('Loader', new Loader());
            Game.state.start('Loader');
        }
    }
});