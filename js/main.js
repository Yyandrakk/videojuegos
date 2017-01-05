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
        },
        'BarHealth':{
            exports:'BarHealth'
        },
        'JQuery':{
            exports:'$'
        }
    },
    paths: {
        'Phaser': '../libs/phaser/build/phaser',
        'Game': 'game',
        'BarHealth':'../libs/HealthBar',
        'JQuery':'../libs/jquery-3.1.1.min'
    }
});

require(['boot'],
    function (boot) {
        boot.start();
    });