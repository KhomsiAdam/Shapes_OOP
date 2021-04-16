var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

// Canvas size
canvas.height = window.innerHeight * 0.70;
canvas.width = window.innerWidth * 0.989;

// Shape class which holds properties : fill color, stroke color, line width
class Shape {
    constructor(fill, stroke, line) {
        this.fill = fill;
        this.stroke = stroke;
        this.line = line;
    }
    // style Method for the above properties to be inherited
    style() {
        context.fillStyle = this.fill;
        context.strokeStyle = this.stroke;
        context.lineWidth = this.line;
    }
}

// Rectangle class inherits properties (fill color, stroke color, line width) from Shape
class Square extends Shape {
    constructor(fill, stroke, line, x, y, lenght) {
        // Getting access to the parent methods and properties
        super(fill, stroke, line);
        // Rectangle properties
        this.x = x;
        this.y = y;
        this.lenght = lenght;
    }
    // draw Method
    draw() {
        context.beginPath();
        // Draws Square in x and y coordinates with specified lenght (Rectangle with width = height)
        context.rect(this.x, this.y, this.lenght, this.lenght);
        // Style method from Shape class
        this.style();
        // Fill shape with color
        context.fill();
        context.closePath();
        // Draw stroke after closing the path
        context.stroke();
    };
}

// Rectangle class inherits properties (fill color, stroke color, line width) from Shape
class Rectangle extends Shape {
    constructor(fill, stroke, line, x, y, width, height) {
        // Getting access to the parent methods and properties
        super(fill, stroke, line);
        // Rectangle properties
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // draw Method
    draw() {
        context.beginPath();
        // Draws rectangle in x and y coordinates with specified width and height
        context.rect(this.x, this.y, this.width, this.height);
        // Style method from Shape class
        this.style();
        // Fill shape with color
        context.fill();
        context.closePath();
        // Draw stroke after closing the path
        context.stroke();
    };
}

// Circle class inherits properties (fill color, stroke color, line width) from Shape
class Circle extends Shape {
    constructor(fill, stroke, line, x, y, r) {
        // Getting access to the parent methods and properties
        super(fill, stroke, line);
        // Circle properties
        this.x = x;
        this.y = y;
        this.r = r;
    }
    // draw Method
    draw() {
        context.beginPath();
        // Draws Circle in x and y coordinates with specified radius clockwise from 0 as starting angle to Math.PI*2 as ending angle to draw full circle
        // arc(x,y,r,startangle,endangle)
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        // Style method from Shape class
        this.style();
        // Fill shape with color
        context.fill();
        context.closePath();
        // Draw stroke after closing the path
        context.stroke();
    };
}

// Irregular Polygon class inherits properties (fill color, stroke color, line width) from Shape
class irregularPolygon extends Shape {
    constructor(fill, stroke, line, poly_points) {
        // Getting access to the parent methods and properties
        super(fill, stroke, line);
        // Polygon properties
        this.poly_points = poly_points;
    }
    // draw Method
    draw() {
        var i;
        context.beginPath();
        // Starting x and y coordinates position 0 and 1 in the array
		context.moveTo(poly_points[0], poly_points[1]);
        // Looping through the polygon points array from position 2 until : array.lenght - 1 to finish at the last x coordinate, incrementing by 2 to get to the next x coordinate, y coordinate is always : x position + 1
		for(i = 2; i < poly_points.length-1; i += 2 ){
			context.lineTo( poly_points[i] , poly_points[i+1] )
		}
        // Style method from Shape class
        this.style();
        // Fill shape with color
        context.fill();
        context.closePath();
        // Draw stroke after closing the path
        //context.stroke();
    }
}

// Clear pixels in canvas within a rectangle (x, y, width, height)
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.clearRect(0,0, context.canvas.width, context.canvas.height)
}

// Clear the polygon array of coordinates
function clearPolygon() {
    poly_points = [];
}

// Manually clear the canvas
document.getElementById('clear-canvas').addEventListener("click",  () => {
    clearCanvas();
    clearPolygon();
});

// Mouse Coordinates/Position in Canvas
function getMousePos(canvas, event) {
    // Returns the size of the Canvas and its position relative to the viewport
    var coor = canvas.getBoundingClientRect();
    return {
      x: event.clientX - coor.left,
      y: event.clientY - coor.top
    };
  }
  // Get mouse coordinates in canvas whenever it is moved inside
  canvas.addEventListener('mousemove', function(event) {
    var mousePos = getMousePos(canvas, event);
    // Show the coordinates
    document.getElementById('mouse-pos').innerHTML = "Mouse position: " + "x: " + mousePos.x + " ; " + "y: " + mousePos.y;
  }, false);

// Get Shape properties inputs
var fill_color_picker = document.getElementById('fill-color');
var stroke_color_picker = document.getElementById('stroke-color');
var line_width = document.getElementById('line-width');

/* Create Square */

// Get Square properties inputs
var square_x = document.getElementById('square-x');
var square_y = document.getElementById('square-y');
var square_lenght = document.getElementById('square-lenght');

document.getElementById('create-square').addEventListener("click", function () {
    // Clear canvas in case a shape is already drawn
    clearCanvas();
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Get Square properties values
    let sx = square_x.value;
    let sy = square_y.value;
    let sl = square_lenght.value;
    // Generate new Square object
    let square = new Square (fill_color, stroke_color, lw, sx, sy, sl);
    square.draw();
});

/* Create Rectangle */

// Get Rectangle properties inputs
var rect_x = document.getElementById('rect-x');
var rect_y = document.getElementById('rect-y');
var rect_width = document.getElementById('rect-width');
var rect_height = document.getElementById('rect-height');

document.getElementById('create-rectangle').addEventListener("click", function () {
    // Clear canvas in case a shape is already drawn
    clearCanvas();
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Get Rectangle properties values
    let rx = rect_x.value;
    let ry = rect_y.value;
    let rw = rect_width.value;
    let rh = rect_height.value;
    // Generate new Rectangle object
    let rect = new Rectangle (fill_color, stroke_color, lw, rx, ry, rw, rh);
    rect.draw();
});

/* Create Circle */

// Get Circle properties inputs
var circle_x = document.getElementById('circle-x');
var circle_y = document.getElementById('circle-y');
var circle_radius = document.getElementById('circle-radius');

document.getElementById('create-circle').addEventListener("click", function () {
    // Clear canvas in case a shape is already drawn
    clearCanvas();
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Get Circle properties values
    let cx = circle_x.value;
    let cy = circle_y.value;
    let cr = circle_radius.value;
    // Generate new Circle object
    let circle = new Circle (fill_color, stroke_color, lw, cx, cy, cr);
    circle.draw();
});

/* Create Irregular Polygon */

// Get Irregular Polygon properties inputs
var poly_point_x = document.getElementById('poly-point-x');
var poly_point_y = document.getElementById('poly-point-y');
var poly_points = [];

// Draw Each Polygon's point manually by inputs
document.getElementById('create-point').addEventListener("click", function () {
    // Push X and Y coordinates in points array for the Irregular Polygon only if the inputs are not empty
    if (poly_point_x.value !== '' || poly_point_y.value !== '') {
    poly_points.push(parseInt(poly_point_x.value));
    poly_points.push(parseInt(poly_point_y.value));
    console.log(poly_points);
    }
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Generate new Irregular Polygon Object
    let irreg_poly = new irregularPolygon (fill_color, stroke_color, lw, poly_points);
    irreg_poly.draw();
})
// Delete latest added point
document.getElementById('delete-point').addEventListener("click", function () {
    // Remove last X and Y coordinates from points array of the Irregular Polygon
    poly_points.pop();
    poly_points.pop();
    console.log(poly_points);
    // Clear canvas to redraw the Irregular Polygon
    clearCanvas();
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Generate new Irregular Polygon Object
    let irreg_poly = new irregularPolygon (fill_color, stroke_color, lw, poly_points);
    irreg_poly.draw();
})
// Draw Irregular Polygon points by mouse on click in the canvas
canvas.addEventListener('click', function(event) {
    // Get Shape properties values
    let fill_color = fill_color_picker.value;
    let stroke_color = stroke_color_picker.value;
    let lw = line_width.value;
    // Get mouse position x and y coordinates and push them into the points array of the Irregular Polygon
    var mousePos = getMousePos(canvas, event);
    poly_points.push(mousePos.x);
    poly_points.push(mousePos.y);
    console.log(poly_points);
    // Generate new Irregular Polygon Object
    let irreg_poly = new irregularPolygon (fill_color, stroke_color, lw, poly_points);
    irreg_poly.draw();
});