function Vector2D(pos_x,pos_y)
{
   this.X=pos_x;
   this.Y=pos_y;
}

function Sprite(src_image,position) {
  this.position = position;
  this.image_sprite = new Image();
  this.image_sprite.src = src_image;
}

Sprite.prototype.render = function(drawingSurface) {
    drawingSurface.drawImage(this.image_sprite,
       0, 0, this.image_sprite.width, this.image_sprite.height,
       this.position.X, this.position.Y,this.image_sprite.width, this.image_sprite.height);
}

function AutoSprite(src_image,position,speed) {
  Sprite.call(this,src_image,position);
  this.speed = speed;
}
AutoSprite.prototype = new Sprite;

AutoSprite.prototype.update = function(canvas) {
  this.update_pos(this.image_sprite.width,this.image_sprite.height,canvas);
}

AutoSprite.prototype.update_pos = function(image_width,image_height,canvas) {
  this.position.X+=this.speed.X;
  if(this.position.X+image_width > canvas.width || this.position.X < 0)
     this.speed.X = this.speed.X * -1 ;

  this.position.Y+=this.speed.Y;
  if(this.position.Y+image_height > canvas.height || this.position.Y < 0)
     this.speed.Y = this.speed.Y * -1 ;
}

function AutoAnimatedSprite(src_image,position,speed,frameNum,frameSize,millisecondsPerFrame) {
  AutoSprite.call(this,src_image,position,speed);
  this.frameNumber = frameNum;
  this.frameSize = frameSize;
  this.currentFrame = new Vector2D(0,0);
  this.lastUpdate=Date.now();
  this.millisecondsPerFrame = millisecondsPerFrame;
}
AutoAnimatedSprite.prototype = new AutoSprite;

AutoAnimatedSprite.prototype.update = function(canvas) {

  var timeSinceLastFrame = (Date.now()-this.lastUpdate);
  if (timeSinceLastFrame > this.millisecondsPerFrame) {
    this.lastUpdate=Date.now();
    this.currentFrame.X++;
    if (this.currentFrame.X >= this.frameNumber.X) {
        this.currentFrame.X = 0;
        this.currentFrame.Y++;
        if (this.currentFrame.Y >= this.frameNumber.Y)
           this.currentFrame.Y = 0;
    }
  }

  this.update_pos(this.frameSize.X,this.frameSize.Y,canvas);
}

AutoAnimatedSprite.prototype.render = function(drawingSurface) {
    drawingSurface.drawImage(this.image_sprite,
       this.currentFrame.X*this.frameSize.X, this.currentFrame.Y*this.frameSize.Y, this.frameSize.X, this.frameSize.Y,
       this.position.X, this.position.Y, this.frameSize.X, this.frameSize.Y );
}
