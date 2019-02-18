
$(document).ready(function(){

    var mario = $('#mario');
    var luigi = $('#luigi');
    var yoshi = $('#yoshi');
    var udacity = $('#udacity');
  
  
    mario.click(function(){
      luigi.prop('checked', false);
    });
  
    luigi.click(function(){
      mario.prop('checked', false);
    });
    
    yoshi.click(function(){
      luigi.prop('checked', false);
    });
    udacity.click(function(){
      mario.prop('checked', false);
      luigi.prop('checked', false);
      yoshi.prop('checked', false);
    });
    'use strict';
  });
  
  var arrival = 0;
  var speedNumber = 0;
  let live = 3;
  // The Enemy
  var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
  
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.speed = speed;
  };
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 950) {
      this.x = -100;
      this.randomSpeed();
    }
    var enemyXleftMax = this.x - 40;
    var enemyXRightMax = this.x + 40;
    var enemyYTopMax = this.y - 35;
    var enemyYBottomMax = this.y + 35;
    if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) { 
      alert('stop')
      player.resetPlayer();
      // Minus one live.
      live--;
      document.getElementById("live").innerHTML = live;
      checkLives();
      //arrival--;
      speedNumber--;
      $('#arrival').text(arrival);
      updateLevel();
    }
  };
  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  Enemy.prototype.randomSpeed = function() {
    var someSpeed = Math.floor(Math.random() * speedNumber + 1);
    this.speed = 1000 * someSpeed;
  };
  
  //The Player
  var player;
  var startX = 404;
  var startY = 485;
  
  var mario = 'images/char-mario.png';
  var luigi = 'images/char-luigi.png';
  var yoshi = 'images/char-yoshi.png';
  var udacity = 'images/char-udacity.png';
  
  var image;
  image = mario;
  
  var Player = function() {
    this.character = image;
    this.x = startX;
    this.y = startY;
    this.borderCheck = {
      leftWall: false,
      rightWall: false,
      bottomWall: true
    };
  };
  
  function changeCharacter(str) {
    console.log(str);
  
  
    if( str == 'mario' ) {
      //contains the image mario;
      player.character = mario;
      //player = new Player();
    }
    if( str == 'luigi' ) {
      //image = luigi;
      player.character = luigi;
      //player = new Player();
    }
    if( str == 'yoshi' ) {
      //image = yoshi;
      player.character = yoshi;
      //player = new Player();
    }
    if( str == 'udacity' ) {
      //image = udacity;
      player.character = udacity;
      //player = new Player();
    }
  
  }
  // let lives = document.getElementById('lives');
  function updateLevel() {
        if(arrival > 10) {
        checkArrival();
    }
    
  
  };
  
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
  };
  
  Player.prototype.handleInput = function(keyInput) {
    var moveLeftRight = 100;
    var moveUpDown = 90;
    this.checkPosition();
    if (keyInput === "left") {
      if (this.borderCheck.leftWall) {
        return null;
      }
      this.x -= moveLeftRight;
    } else if (keyInput === "right") {
      if (this.borderCheck.rightWall) {
        return null;
      }
      this.x += moveLeftRight;
    } else if (keyInput === "up") {
      if (this.y <= 10) {
        this.resetPlayer();
          arrival++;
          speedNumber++;
          $('#arrival').text(arrival);
          updateLevel();
        if(arrival > 10) {
          addEnemies();
        }
        return null
      }
  
      this.y -= moveUpDown;
    }
  
    else if (keyInput === "down") {
      if (this.borderCheck.bottomWall) {
        return null;
      }
      this.y += moveUpDown;
    } else {
      return null;
    }
  };
  Player.prototype.checkPosition = function() {
    if (this.x <= 10) {
      this.HorizontalCheck(true, false);
    } else if (this.x >= 404) {
      this.HorizontalCheck(false, true);
    } else {
      this.HorizontalCheck(false, false);
    }
    if (this.y >= 485) {
      this.borderCheck.bottomWall = true;
    } else {
      this.borderCheck.bottomWall = false;
    }
  };
  Player.prototype.resetCheckPosition = function() {
    this.HorizontalCheck(false, false);
    this.borderCheck.bottomWall = true;
  };
  Player.prototype.HorizontalCheck = function(leftWallState, rightWallState) {
    this.borderCheck.leftWall = leftWallState;
    this.borderCheck.rightWall = rightWallState;
  };
  Player.prototype.resetPlayer = function() {
    this.x = startX;
    this.y = startY;
    this.checkPosition();
  };
  
//  function of lost the game
  function gameLost(){
    overlay.classList.add("show");
    gameLost.classList.add("show");
  }
  
  
  function checkLives(){
      if (live == 0){    
          // check the number of lives;
          document.getElementById("results-title").innerHTML = "GAME OVER !!!!!!!!";
          openModal();
      }
  }
  
  function arrival(){
    overlay.classList.add("show");
    arrival.classList.add("show");
  }
  function checkArrival(){
    if(arrival > 10){    
        // check the number of times you crossed if you count 10 you won the game;
        document.getElementById("results-title").innerHTML = "YOU WIN !!!!";
        openModal();
    }
  }
  
  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  var allEnemies = [];
  
  for (var i = 0; i < 5; i++) {
    var aSpeed = Math.floor(Math.random() * 4 + 1) * 60;
    allEnemies.push(new Enemy(-80, 60 + 80 * i, aSpeed));
  }
  
  function addEnemies() {
    for (var i = 0; i < 5; i++) {
      var aSpeed = Math.floor(Math.random() * 4 + 1) * 25;
      allEnemies.push(new Enemy(-80, 60 + 80 * i, aSpeed));
    }
  }
  
  // Place the player object in a variable called player
  player = new Player();
  updateLevel();
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
  });
  
    //modal variable
  let modal = document.getElementById("modalPopup")
  
  //in the function congrat show that the cards match the time, the movements and the arrival
  function openModal() {
      modal.classList.add("show");x
  }
  
  