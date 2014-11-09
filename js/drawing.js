(function ( document, window ) {

    var clickX = {};
    var clickY = {};
    var clickDrag = {};
    var paint;

    $('.step').append('<canvas width="940" height="680" class="annotation-layer"></canvas>');

    // for (var i = 0; i < slide_objects.length; i++) {
    //   slide_objects[i].append('<canvas width="940" height="680" class="annotation-layer"></canvas>')
    // }

    function addClick(element_id, x, y, dragging)
    {
      if (!(element_id in clickX)) {
        clickX[element_id] = new Array();
        clickY[element_id] = new Array();
        clickDrag[element_id] = new Array();
      }

      clickX[element_id].push(x);
      clickY[element_id].push(y);
      clickDrag[element_id].push(dragging);
    }

    $('.annotation-layer').mousedown(function(e){
        var rect = this.getBoundingClientRect();
      var mouseX = e.pageX - rect.left;
      var mouseY = e.pageY - rect.top;
            
      paint = true;
      addClick(this.parentNode.id, mouseX, mouseY);
      redraw(this);
    });

    $('.annotation-layer').mousemove(function(e){
      if(paint){
        var rect = this.getBoundingClientRect();
        addClick(this.parentNode.id, e.pageX - rect.left, e.pageY - rect.top, true);
        redraw(this);
      }
    });

    $('.annotation-layer').mouseup(function(e){
      paint = false;
    });

    $('.annotation-layer').mouseleave(function(e){
      paint = false;
    });

    function redraw(element) {
        element_id = element.parentNode.id;
        context = element.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        // context.fillStyle = "#bbb";

        context.strokeStyle = "#ff0000";
        context.lineJoin = "round";
        context.lineWidth = 2;
        
        for(var i=0; i < clickX[element_id].length; i++) {        
            context.beginPath();
            if(clickDrag[element_id][i] && i) {
                  context.moveTo(clickX[element_id][i-1], clickY[element_id][i-1]);
            } else {
                context.moveTo(clickX[element_id][i]-1, clickY[element_id][i]);
            }
            context.lineTo(clickX[element_id][i], clickY[element_id][i]);
            context.closePath();
            context.stroke();
        }
    }

})(document, window);
