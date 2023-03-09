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

// 使用数据和画板（drawing context）画出蛇的形状
for (let i = 0; i < snake.length; i++) {
  // 填充颜色
  ctx.fillStyle = "lightblue";
  // 画一个矩形，参数为 x y width height
  ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
}
