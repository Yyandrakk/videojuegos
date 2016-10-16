function Gamepad () {
 var instance=this;
 var gamepadConnected = false;

 if(navigator.getGamepads()[0])
   this.gamepadConnected = true;
 else
   this.gamepadConnected = false;

  function onGamepadConnect(event) {
     instance.gamepadConnected = true;
  };

  function onGamepadDisconnect(event) {
     instance.gamepadConnected= false;
  };

  window.addEventListener('gamepadconnected', onGamepadConnect, false);
  window.addEventListener('gamepaddisconnected', onGamepadDisconnect, false);
}

Gamepad.prototype.GetGamepad = function() {
	  return navigator.getGamepads()[0];
};
