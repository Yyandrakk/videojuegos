function Raton (canvas) {
 var instance=this;
 this.canvas=canvas;
 this.mouse_pos = new Vector2D(0,0);

  function mouse_pos(event) {
        instance.mouse_pos.X=event.pageX - canvas.offsetLeft;
        instance.mouse_pos.Y=event.pageY - canvas.offsetTop;
 };

 canvas.addEventListener("mousemove", mouse_pos, false);
}
