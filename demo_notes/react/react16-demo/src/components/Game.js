import React, {Component} from 'react';
import { BOARD_LINE_NUM } from '../settings';
import {index2point, calculateWinner} from '../utils';
import Clock from './Clock';

// 组件名称必须以大写字母开头，作为标签使用的时候也一样，且组件只能有一个根元素，这与vue中一样
// 组件中的props只能读取，不能去修改它，可修改的数据应放在表示组件数据状态的state中

// 对于无状态组件(组件本身不使用state)，也没有其他的内部处理方法的组件，可以不使用class类定义组件，而直接使用函数式定义组件，更加简洁高效
// 此时将props作为该函数的参数，传入的属性直接通过该props访问，不再使用this.props
function Square(props) {
  // 通过子组件的事件反馈让父组件中的方法处理上层状态，从而再改变对应子组件中的数据
  // 须注意，组件上的事件on开头是以小驼峰命名的，不像原生html上DOM事件是全小写，
  // 且指定的事件处理函数是引用，不能添加括号直接执行，若要添加括号可以放在一个箭头函数中
  // 事件处理函数默认接受一个事件对象event参数，该事件对象是react合成的（做过兼容处理）
  // 与原生事件不同，return false 并不能阻止事件默认行为，而必须显式调用preventDefault()方法
  // 要在事件处理函数内部使用代表组件本身的this关键字时，要么使用箭头函数，要么在constructor中使用bind改变处理函数中this指向，
  // 或者在定义处理函数时使用handleClick = () => {} 箭头函数方式定义，否者this指向将为undefined（因并不是传统HTML绑定事件的方式，故并未指向触发事件的元素）
  return (
      <button className="square" onClick={props.eventClick}>
        {props.value}
      </button>
  );
}

// 有状态组件或是除render函数外还定义了一些内部逻辑处理方法的组件就应使用class类定义组件
class Board extends Component {
  // react中的props可直接访问，而vue中必须先通过props属性声明
  renderSquare(i) {
    return (
        <Square
            key={i}
            value={this.props.squares[i]}
            eventClick={() => this.props.eventClick(i)}
        />
    );
  }

  render() {
    return (
        <div>
          {
            /**
             * 使用数组的map方法进行列表遍历渲染，须注意key属性的作用
             * */
            Array(BOARD_LINE_NUM).fill(null).map((item, index) => (
                /* key属性用于表示组件唯一标识，用于相同兄弟组件间的区分，该属性是传递给react的，并不会传递给组件，所以组件中并不能访问key传递的值，要使用该值只能通过其他自定义属性传递 */
                <div className="board-row" key={index}>
                  {
                    Array(BOARD_LINE_NUM).fill(null).map((value, i) => this.renderSquare(index * BOARD_LINE_NUM + i))
                  }
                </div>
            ))
          }
        </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    // react中这里的组件自身状态state，类似vue组件中私有的data，但vue默认就是双向数据流，而react是单向数据流，故需要使用setState()方法改变state才能触发视图改变
    this.state = {
      // history字段用于保存每步的历史棋局
      history: [
        {
          squares: Array(Math.pow(BOARD_LINE_NUM, 2)).fill(null),   // 默认第一步都是空（还未下子）
          currentSquares: null    // 当前下子所在格子索引
        }
      ],
      stepNumber: 0,
      isXNext: true  // 下一步是否是'🌝'，false则为'🌚'，最初默认true则表示第一步为'🌝'，之后变换该值表示'🌝'和'🌚'交替进行
    };
    // this.handleClick = this.handleClick.bind(this);   // 使事件处理函数中的this指向组件而非触发事件时所在的元素，也可在绑定事件时使用箭头函数替代
  }

  // 推荐这样定义事件处理函数，这样其中的this就能正确指向本组件，或者按一般方法定义在在constructor中用bind改变this指向
  // 在元素或组件上绑定事件时，虽可以使用箭头函数让this指向组件，但这样每次渲染该组件也都会创建不同的回调函数，当该方法是传给子组件使用的时候就可能会导致额外的重新渲染，
  // 所以推荐这样定义处理函数，在需要传参时再在绑定事件时使用箭头函数(或bind方法)
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // 这里使用slice()的目的是复制一个新数组，而不直接修改原始数据源，这里的目的是保留历史操作数据
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    squares[i] =  this.state.isXNext ? '🌝' : '🌚';
    this.setState({
      history: history.concat([{   // 不能使用push，因为这样会改变原始数组
        squares,
        currentSquares: i
      }]),
      stepNumber: history.length,   // 每次下子都更新相应步长
      isXNext: !this.state.isXNext
    });
  };

  jumpTo(n) {
    this.setState({
      stepNumber: n,
      isXNext: (n % 2) ? false : true   // 该步骤n是按照history数组索引来的
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status = winner ? `获胜方：${winner}` : `下一位: ${this.state.isXNext ? '🌝' : '🌚'}`;

    const steps = history.map((step, index) => {
      const desc = index ? `${step.squares[step.currentSquares]}落子（${index2point(step.currentSquares)}）` : '开始棋局';
      return (
          /*这里的key属性最好使用数据的唯一id或是其他标志，数组索引并不是好的选择，因为若该列表存在增删，那么这些索引值就会改变，就不能达到每个列表项都唯一且不变*/
          <li key={index}>
            <a className="step-item" href="#none" onClick={() => this.jumpTo(index)}>{desc}</a>
          </li>
      );
    });

    return (
        <div className="game">
          <Clock />
          <div className="game-board">
            <Board
                squares={current.squares}
                eventClick={this.handleClick}  /*这里要么使用箭头函数，要么在constructor中使用bind改变this指向，或者使用箭头函数方式定义处理函数，否者this将指向undefined*/
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{steps}</ol>
          </div>
        </div>
    );
  }
}

export default Game;
