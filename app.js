const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() 返回一个canvas 的 drawing context
// drawing context可以用来在canvas内画图

const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16

// 使用一个对象数组储存蛇身体的坐标
let snake = [];

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

let snakeMovingDirection = "right";

function drawSnake() {
  // 每次画图之前重置背景和坐标
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  snake.pop();
  snake.unshift(newSnakeHead);
}

let snakeGame = setInterval(drawSnake, 100);
