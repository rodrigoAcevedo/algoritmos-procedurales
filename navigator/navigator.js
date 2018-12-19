// Javascript

var WORLD = document.getElementById('world');

var dimension = 10;
var dist = 50;

var boxes = [];

function Square(id, posX, posY)
{

  this.id = id;

  this.posX = posX;
  this.posY = posY;

  this.hover = false;
  this.nearby = false;

  this.blocker = false;
  this.flagged = false;

  this.html = '';

  this.drawSquare = function()
  {
    var classes = "box grey";
    if(this.blocker == true) {
      classes = "box black";
    }
    this.html = '<div class="' + classes + '" id="' + this.id + '" style="top:' + posX*dist + 'px;left:' + posY*dist + 'px">'
     + this.id
     + '<br>'
     + 'x:' + posX + '; y:' + posY
     + '</div>';
  }

  this.setSquare = function()
  {
    return this.html;
  }

  this.toggleActive = function()
  {
    this.hover = !this.hover
    return this.hover;
  }

  this.toggleNearby = function()
  {
    this.nearby = !this.nearby;
    return this.nearby;
  }

}

start();
addEvents();

function start()
{
var id = 0;
var currentBox;
  for(var i = 0; i < dimension; i++)
  {
    var boxCell = [];
    boxes[i] = boxCell;
    for(var j = 0; j < dimension; j++)
    {
      boxCell[j] = new Square(id,i,j);
      boxCell[j].blocker = setRandom(1); // Devuelve true o false arbitrariamente, el parametro es un range, a mas alto menos obstaculos
      boxCell[j].drawSquare(); // Dibuja el cuadrado

      currentBox = boxes[i][j];
      WORLD.innerHTML += currentBox.setSquare();

      id++;
    }
  }
}

function addEvents()
{
  for(var k = 0; k < boxes.length; k++)
  {
    for(var l = 0; l < boxes[k].length; l++)
    {
      (function() {
        var currentBox = boxes[k][l];
        document.getElementById(String(currentBox.id)).addEventListener( 'mouseover', function() { setActive( currentBox ) } );
        document.getElementById(String(currentBox.id)).addEventListener( 'mouseleave', function() { setActive( currentBox ) } );
      }());
    }
  }
}

function setRandom( range )
{
  var random;
  random = Math.round(Math.random() * range);
  if(random == 1) {
    return true;
  } else {
    return false;
  }
}

function setActive( box )
{
  box.toggleActive();

  var x = box.posX;
  var y = box.posY;
  var boxN, boxS, boxE, bosW;

  if(box.hover == true && box.blocker == false)
  {
    $(String('#'+box.id)).addClass('green');
    // setNearBoxes( box );
    console.info("Adjacent Boxes:");
    getAdjacentBoxes(box);
  } else {
    $(String('#'+box.id)).removeClass('green');
    resetBoxes();
  }
}

function setNearBoxes( box )
{
  var x = box.posX;
  var y = box.posY;
  var boxN, boxS, boxE, boxW;
  var nearBoxes = [];
  if(x > 0) {
    boxN = boxes[x-1][y];
    if(boxN.blocker == false) {
      nearBoxes.push(boxN);
    }
  }

  if(x < dimension - 1) {
    boxS = boxes[x+1][y];
    if(boxS.blocker == false) {
      nearBoxes.push(boxS);
    }
  }

  if(y < dimension - 1) {
    boxE = boxes[x][y+1];
    if(boxE.blocker == false) {
      nearBoxes.push(boxE);
    }
  }

  if(y > 0) {
    boxW = boxes[x][y-1];
    if(boxW.blocker == false) {
      nearBoxes.push(boxW);
    }
  }

  for(var i = 0; i < nearBoxes.length; i++)
  {
    $(String('#'+nearBoxes[i].id)).addClass('blue');
  }

}

function getAdjacentBoxes(box)
{
    console.info("box id: " + box.id);
    var x = box.posX;
    var y = box.posY;
    box.flagged = true;
    var adjacentBoxes = [];
    if (x > 0)
    {
        if (boxes[x-1][y].blocker == false && boxes[x-1][y].flagged == false)
        {
            adjacentBoxes.push(boxes[x-1][y]);
            boxes[x-1][y].flagged = true;
        }
    }

    if (x < dimension - 1)
        {
        if(boxes[x+1][y].blocker == false && boxes[x+1][y].flagged == false) {
            adjacentBoxes.push(boxes[x+1][y]);
            boxes[x+1][y].flagged = true;
        }
    }

    if (y < dimension - 1)
    {
        if(boxes[x][y+1].blocker == false && boxes[x][y+1].flagged == false) {
            adjacentBoxes.push(boxes[x][y+1]);
            boxes[x][y+1].flagged = true;
        }
    }

    if (y > 0)
    {
        if(boxes[x][y-1].blocker == false && boxes[x][y-1].flagged == false) {
            adjacentBoxes.push(boxes[x][y-1]);
            boxes[x][y-1].flagged = true;
        }
    }
    for (var i = 0; i < adjacentBoxes.length; i++)
    {
        $(String('#'+adjacentBoxes[i].id)).addClass('blue');
        getAdjacentBoxes(adjacentBoxes[i]);
    }
}

function resetBoxes() {
  for(var i = 0; i < dimension; i++) {
    for(var j = 0; j < dimension; j++) {
      $(String('#'+boxes[i][j].id)).removeClass('blue');
      boxes[i][j].flagged = false;
    }
  }
}
