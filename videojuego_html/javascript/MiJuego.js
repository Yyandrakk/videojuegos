
function Game() {

  var instance = this;
  this.points = 0;
  this.collision_flag=false;

  this.update = function()  {

	 if(this.keyboard.keyboard_stat.pulse_up == true && (Math.sqrt(this.sprite1.speed.X*this.sprite1.speed.X+this.sprite1.speed.Y*this.sprite1.speed.Y) <40) ) {
	  this.sprite1.speed.X  *= 1.1;
	  this.sprite1.speed.Y  *= 1.1;
	}

	if(this.keyboard.keyboard_stat.pulse_down == true && (Math.sqrt(this.sprite1.speed.X*this.sprite1.speed.X+this.sprite1.speed.Y*this.sprite1.speed.Y) >2)) {
	  this.sprite1.speed.X  *= 0.9;
      this.sprite1.speed.Y  *= 0.9;
	}

	 if(this.keyboard.keyboard_stat.pulse_right == true && (Math.sqrt(this.sprite2.speed.X*this.sprite2.speed.X+this.sprite2.speed.Y*this.sprite2.speed.Y) <40) ) {
	  this.sprite2.speed.X  *= 1.1;
	  this.sprite2.speed.Y  *= 1.1;
	}

	if(this.keyboard.keyboard_stat.pulse_left == true && (Math.sqrt(this.sprite2.speed.X*this.sprite2.speed.X+this.sprite2.speed.Y*this.sprite2.speed.Y) >2)) {
	  this.sprite2.speed.X  *= 0.9;
      this.sprite2.speed.Y  *= 0.9;
	}

	this.sprite3.position.X=this.mouse.mouse_pos.X;
	this.sprite3.position.Y=this.mouse.mouse_pos.Y;

	 var r1 = new Rect(this.sprite1.position.X,this.sprite1.position.Y,75,75);
	 var r2 = new Circle(this.sprite2.position.X,this.sprite2.position.Y,32);
	 var r3 = new Circle(this.sprite3.position.X,this.sprite3.position.Y,26);

	 this.collision_flag=r3.collisionC(r2) || r3.collisionR(r1);

     this.sprite1.update(instance.canvas);
     this.sprite2.update(instance.canvas);
	 this.sprite3.update(instance.canvas);
   }

    this.render = function() {

      this.drawingSurface.clearRect(0, 0, this.width, this.height);
      this.drawingSurface.fillRect(0, 0, this.width, this.height);
      this.sprite1.render(instance.drawingSurface);
      this.sprite2.render(instance.drawingSurface);
      this.sprite3.render(instance.drawingSurface);

      this.drawingSurface.font = 'italic bold 30px sans-serif';
      this.drawingSurface.textBaseline = 'bottom';
	  this.drawingSurface.fillStyle="#000000";
      this.drawingSurface.fillText("Puntuaci\xF3n: 0", 50, instance.canvas.height-30);
	  this.drawingSurface.fillStyle="#0040BE";

	  if(this.collision_flag)  window.alert("Colision");
   }

   this.Gameloop = function()  {
      //Update data
      instance.update();
      //Render the animation
      instance.render();
      instance.lastUpdate=Date.now();
      requestAnimationFrame(instance.Gameloop);
   }

   this.initialize = function(canvasId) {
       this.canvas= document.getElementById(canvasId);
       this.width = this.canvas.width;
       this.height= this.canvas.height;

     // Set up the rendering context
       this.drawingSurface = this.canvas.getContext("2d");
       if(!this.drawingSurface) {
	    return alert("Este navegador no soporta Canvas");
      }
      this.drawingSurface.fillStyle="#0040BE";
      this.lastUpdate=Date.now();

      this.sprite1 = new AutoAnimatedSprite("Imagenes/plus.png",new Vector2D(300,300),new Vector2D(3,2),
	      new Vector2D(6,4),new Vector2D(75,75),20);
	  this.sprite2 = new AutoAnimatedSprite("Imagenes/threerings.png",new Vector2D(300,200),new Vector2D(2,3),
	      new Vector2D(6,8),new Vector2D(75,75),20);
	  this.sprite3 = new AutoAnimatedSprite("Imagenes/skullball.png",new Vector2D(0,0),new Vector2D(0,0),
	      new Vector2D(6,8),new Vector2D(75,75),20);

	  this.keyboard=new Teclado();
      this.mouse=new Raton(this.canvas);
      this.canvas.style.cursor = "none";

	  this.gamepad = new Gamepad();

	  instance.Gameloop();
   }

};

var MiJuego = new Game();
MiJuego.initialize("MiJuego");
