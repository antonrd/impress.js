var Drawing = (function (drawing) {

    var SLIDE_WIDTH = 940;
    var SLIDE_HEIGHT = 680;
    var CLEAR_BUTTON_LABEL = "Clear slide";

    var clickX = {};
    var clickY = {};
    var clickDrag = {};
    var drawPosition = {};
    var paint = false;
    var penColor = "#FF0000";

    drawing.setupAll = function() {
      setupControls();
      setupCanvas();
    }

    var setupControls = function() {
      $('.step').append('<canvas width="' + SLIDE_WIDTH + '" height="' + SLIDE_HEIGHT + '" class="annotation-layer"></canvas>');
      $('body').append('<button class="clear-canvas">' + CLEAR_BUTTON_LABEL + '</button>');
      $('body').append('<button class="pen-color red-pen"></button>');
      $('body').append('<button class="pen-color green-pen"></button>');
      $('body').append('<button class="pen-color blue-pen"></button>');
      $('body').append('<button class="pen-color orange-pen"></button>');
      $('.clear-canvas').bind('click', function() {
        $('.step.active > canvas')[0].getContext('2d').clearRect(0, 0, 940, 680);
        element_id = $('.step.active')[0].id
        clickX[element_id] = [];
        clickY[element_id] = [];
        clickDrag[element_id] = [];
        drawPosition[element_id] = 0;
      })

      $('.pen-color').bind('click', function() {
        penColor = $(this).css('background-color');
      })
    }

    var addClick = function(element_id, x, y, dragging) {
      if (!(element_id in clickX)) {
        clickX[element_id] = new Array();
        clickY[element_id] = new Array();
        clickDrag[element_id] = new Array();
        drawPosition[element_id] = 0;
      }

      clickX[element_id].push(x);
      clickY[element_id].push(y);
      clickDrag[element_id].push(dragging);
    }

    var setupCanvas = function() {
      $('.annotation-layer').mousedown(function(e) {
          var rect = this.getBoundingClientRect();
        var mouseX = e.pageX - rect.left;
        var mouseY = e.pageY - rect.top;
              
        paint = true;
        addClick(this.parentNode.id, mouseX, mouseY);
        redraw(this);
      });

      $('.annotation-layer').mousemove(function(e) {
        if(paint){
          var rect = this.getBoundingClientRect();
          addClick(this.parentNode.id, e.pageX - rect.left, e.pageY - rect.top, true);
          redraw(this);
        }
      });

      $('.annotation-layer').mouseup(function(e) {
        paint = false;
      });

      $('.annotation-layer').mouseleave(function(e) {
        paint = false;
      });
    }

    var redraw = function(element) {
      element_id = element.parentNode.id;
      context = element.getContext("2d");

      context.strokeStyle = penColor;
      context.lineJoin = "round";
      context.lineWidth = 2;
      
      for(var i=drawPosition[element_id]; i < clickX[element_id].length; i++, drawPosition[element_id]++) {        
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

    return drawing;

}(Drawing || {}));

Drawing.setupAll();
