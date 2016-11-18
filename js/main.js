/**
 * Created by oscar on 13/11/16.
 */
requirejs.config({
    baseUrl:"js",
    shim : {
        'Phaser': {
            exports: 'Phaser'
        },
        'Game':{
            deps : ['Phaser'],
            exports: 'Game'
        }
    },
    paths: {
        'Phaser': '../libs/phaser/build/phaser',
        'Game': 'game'
    }
});

require(['boot'],
    function (boot) {
        boot.start();
    });