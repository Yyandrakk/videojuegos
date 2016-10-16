function collisionRectRect (r1,r2) {
  return Math.abs(r1.centerX() - r2.centerX()) < r1.halfWidth() + r2.halfWidth()
      && Math.abs(r1.centerY() - r2.centerY()) < r1.halfHeight() + r2.halfHeight();
};

function collisionCircleCircle (c1,c2) {
       var dx = c1.center.X - c2.center.X;
       var dy = c1.center.Y - c2.center.Y;
       var radii = c1.R + c2.R;
       return (dx * dx) + (dy * dy) < radii * radii;
};

function collisionRectCircle (r,c) {
   var cx = Math.abs(c.center.X - r.pos.X - r.halfWidth());
   var xDist = r.halfWidth() + c.R;
   if (cx > xDist)
     return false;

   var cy = Math.abs(c.center.Y - r.pos.Y - r.halfHeight());
   var yDist = r.halfHeight() + c.R;
   if (cy > yDist)
     return false;
   if (cx <= r.halfWidth() || cy <= r.halfHeight())
     return true;

   var xCornerDist = cx - r.halfWidth();
   var yCornerDist = cy - r.halfHeight();
   var xCornerDistSq = xCornerDist * xCornerDist;
   var yCornerDistSq = yCornerDist * yCornerDist;
   var maxCornerDistSq = c.R * c.R;
   return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
}

function Rect (pos_x,pos_y,width,height) {
    this.pos = new Vector2D(pos_x,pos_y);
	this.Width=width;
	this.Height=height;
};

Rect.prototype.centerX=function() {
	return this.pos.X + (this.Width / 2);
};
Rect.prototype.centerY=function() {
	return this.pos.Y + (this.Height / 2);
};
Rect.prototype.halfWidth=function() {
  return this.Width / 2;
};
Rect.prototype.halfHeight=function() {
   return this.Height / 2;
};
Rect.prototype.collisionR = function(r) {
  return collisionRectRect(this,r);
};
Rect.prototype.collisionC = function(c) {
  return collisionRectCircle(this,c);
}
function Circle(pos_x,pos_y,radius) {
   this.center = new Vector2D(pos_x,pos_y);
   this.R = radius;
}
Circle.prototype.collisionC = function(c) {
  return collisionCircleCircle(this,c);
}
Circle.prototype.collisionR = function(r) {
  return collisionRectCircle(r,this);
}

