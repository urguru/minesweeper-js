function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.bee = false;
  this.revealed = false;
}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bee) {
      stroke(0);
      fill(127);
      ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.5);
    } else {
      fill(125);
      rect(this.x, this.y, this.w, this.w);
      textAlign(CENTER);
      fill(0);
      if (this.neighborCount != 0) {
        text(this.neighborCount, this.x + this.w / 2, this.y + this.w * 0.7);
      }
    }
  }
};

Cell.prototype.contains = function(x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveal = function() {
  this.revealed = true;
  if (this.bee == true) {
    for (var i = 0; i < cols; ++i) {
      for (var j = 0; j < rows; ++j) {
        grid[i][j].revealed = true;
      }
    }
    var res=document.getElementById('Game-Status').innerText='You Lose';
  }
  if (this.neighborCount == 0) {
    this.floodfill();
  }
  if (this.bee != true) {
    var count=0;
    for (var i = 0; i < cols; ++i) {
      for (var j = 0; j < rows; ++j) {
        if(grid[i][j].bee!=true){
          if(grid[i][j].revealed==true)
          {
            count++;
          }
        }
      }
    }
    if(count==90)
    {
    var res = document.getElementById('Game-Status').innerText = 'You Win';
      for (var i = 0; i < cols; ++i) {
        for (var j = 0; j < rows; ++j) {
          grid[i][j].revealed = true;
        }
      }
    }
    else{
      var res = document.getElementById('Game-Status').innerText = 'Good Move Keep Trying';
    }
  }
};

Cell.prototype.countNeighbors = function() {
  if (this.bee) {
    this.neighborCount = -1;
  }
  var total = 0;
  for (var i = -1; i <= 1; ++i) {
    for (var j = -1; j <= 1; ++j) {
      if (
        this.i + i >= 0 &&
        this.j + j >= 0 &&
        this.i + i < cols &&
        this.j + j < rows
      ) {
        var neighbor = grid[this.i + i][this.j + j];
        if (neighbor.bee == true) {
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
};

Cell.prototype.floodfill = function() {
  for (var i = -1; i <= 1; ++i) {
    for (var j = -1; j <= 1; ++j) {
      if (
        this.i + i >= 0 &&
        this.j + j >= 0 &&
        this.i + i < cols &&
        this.j + j < rows
      ) {
        var neighbor = grid[this.i + i][this.j + j];
        if (!neighbor.bee && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
};
