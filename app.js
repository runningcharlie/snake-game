const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() 返回一个canvas 的 drawing context
// drawing context可以用来在canvas内画图

const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16

// 使用一个对象数组储存蛇身体的坐标
let snake = [];

function createSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };

  snake[1] = {
    x: 60,
    y: 0,
  };

  snake[2] = {
    x: 40,
    y: 0,
  };

  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  generateANewFruit() {
    let overlapping = false; // 果实是否与蛇的身体重叠的状态
    let newFruitLocationX;
    let newFruitLocationY;

    function isFruitOverlopSnake(fruitNewX, fruitNewY) {
      for (let i = 0; i < snake.length; i++) {
        if (fruitNewX === snake[0].x && fruitNewY === snake[0].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      newFruitLocationX = Math.floor(Math.random() * column) * unit;
      newFruitLocationY = Math.floor(Math.random() * row) * unit;
      isFruitOverlopSnake(newFruitLocationX, newFruitLocationY);
    } while (overlapping);

    this.x = newFruitLocationX;
    this.y = newFruitLocationY;
  }
}

createSnake();

let myFruit = new Fruit();

window.addEventListener("keydown", changeDiedction);

let snakeMovingDirection = "right";

function changeDiedction(e) {
  if (e.key === "ArrowLeft" && snakeMovingDirection !== "right") {
    snakeMovingDirection = "left";
  } else if (e.key === "ArrowRight" && snakeMovingDirection !== "left") {
    snakeMovingDirection = "right";
  } else if (e.key === "ArrowUp" && snakeMovingDirection !== "down") {
    snakeMovingDirection = "up";
  } else if (e.key === "ArrowDown" && snakeMovingDirection !== "up") {
    snakeMovingDirection = "down";
  }
}

function drawSnake() {
  // 每次画图之前重置背景和坐标
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  // 开始画图
  for (let i = 0; i < snake.length; i++) {
    // 辨认出蛇的头
    if (i === 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    // 外框颜色
    ctx.strokeStyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }

    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }

    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }

    if (snake[i].y < 0) {
      snake[i].y = canvas.width - unit;
    }

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    // 画出外框的颜色
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  // 原始的蛇的位置
  let snakeBodyCoordinateX = snake[0].x;
  let snakeBodyCoordinateY = snake[0].y;

  if (snakeMovingDirection === "left") {
    snakeBodyCoordinateX -= unit;
  } else if (snakeMovingDirection === "up") {
    snakeBodyCoordinateY -= unit;
  } else if (snakeMovingDirection === "right") {
    snakeBodyCoordinateX += unit;
  } else if (snakeMovingDirection === "down") {
    snakeBodyCoordinateY += unit;
  }

  // 根据计算出的值更新蛇的位置

  let newSnakeHead = {
    x: snakeBodyCoordinateX,
    y: snakeBodyCoordinateY,
  };

  if (snake[0].x === myFruit.x && snake[0].y === myFruit.y) {
    myFruit.generateANewFruit();
  } else {
    snake.pop();
  }

  snake.unshift(newSnakeHead);
}

let snakeGame = setInterval(drawSnake, 100);
