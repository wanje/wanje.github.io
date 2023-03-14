import { BOARD_LINE_NUM } from '../settings';

// 获取唯一id
const getUID = (function() {
  let n = 0;
  return function () {
    return n++;
  }
})();

// 将多个样式class组合后输出成html元素上可使用的格式(空格间隔)，主要用于动态添加或变量存储的class
function convertClass(...prams) {
  return prams.join(' ').trim();
}

// 由棋子索引值确定棋子所在棋盘坐标
function index2point(index) {
  let pointX = parseInt(index / BOARD_LINE_NUM) + 1;
  let pointY = index % BOARD_LINE_NUM + 1;
  return [pointX, pointY];
}

// 获胜方判断
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}

export {
  index2point,
  calculateWinner,
  getUID,
  convertClass
}