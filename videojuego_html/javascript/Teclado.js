var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

function keyboard_st () {
	this.pulse_up=false;
    this.pulse_down=false;
	this.pulse_left=false;
	this.pulse_right=false;
}

function Teclado () {
 var instance=this;
 this.keyboard_stat = new keyboard_st();

 this.key_manager_down= function(event)
{
  switch(event.keyCode)
  {
    case UP:
	  instance.keyboard_stat.pulse_up=true;
	  break;
    case DOWN:
	  instance.keyboard_stat.pulse_down=true;
	  break;
    case LEFT:
	  instance.keyboard_stat.pulse_left=true;
	  break;
    case RIGHT:
	  instance.keyboard_stat.pulse_right=true;
	  break
   }
}

this.key_manager_up= function(event)
{
  switch(event.keyCode)
  {
    case UP:
	  instance.keyboard_stat.pulse_up=false;
	  break;
    case DOWN:
	  instance.keyboard_stat.pulse_down=false;
	  break;
    case LEFT:
	  instance.keyboard_stat.pulse_left=false;
	  break;
    case RIGHT:
	  instance.keyboard_stat.pulse_right=false;
	  break;
   }
}

 window.addEventListener("keydown",this.key_manager_down,false);
 window.addEventListener("keyup",this.key_manager_up,false);
}




