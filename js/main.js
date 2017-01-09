/**
 * Archivo de configuracion e inicio
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
        },
        'TouchControl':{
            exports:'TouchControl'
        }
    },
    paths: {
        'Phaser': '../libs/phaser/build/phaser',
        'Game': 'game',
        'BarHealth':'../libs/HealthBar',
        'JQuery':'../libs/jquery-3.1.1.min',
        'TouchControl':'../libs/phaser-touch-control'
    }
});

require(['boot'],
    function (boot) {
        boot.start();
    });