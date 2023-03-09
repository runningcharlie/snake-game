const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() 返回一个canvas 的 drawing context
// drawing context可以用来在canvas内画图

// 计算出游戏区域每一格的宽高
const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16
