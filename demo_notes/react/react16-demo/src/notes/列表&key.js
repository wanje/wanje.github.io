import React from 'react';
import {getUID} from '../utils';

/**
 * 列表渲染中常用数组的`map()`方法对数据数组进行遍历操作，`map()`与`forEach()`方法都可以遍历数组，但`map`返回的是一个全新数组，而`forEach`是改变原数组
 * 原则是最好不影响原始数据对象，而且数据变化应是一个新的数据，这样才会触发DOM更新，所以应该使用`map()`方法进行遍历操作
 * */
class ListKey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [
        {id: getUID(), fruit: '🍎', price: 12},
        {id: getUID(), fruit: '🍌', price: 6},
        {id: getUID(), fruit: '🍉', price: 3}
      ]
    };
    this.index = 0;
    this.fruits = ['🍐', '🍇', '🍑', '🍈', '🍊', '🍍', '🍒', '🥝', '🍅', '🥥', '🌰', '🥜'];
  }

  handleClick = () => {
    this.setState((preState) => {
      return {
        dataList: preState.dataList.concat({id: getUID(), fruit: this.fruits[this.index], price: (Math.random()*10+3).toFixed(1)})
      }
    }, function () {
      // 上面更新完数据后执行该回调，确保上次操作的数据更新已完成，否则index已变化而上面的数据却还未更新完就将导致取到的数据位置不对
      this.index===this.fruits.length-1 ? this.index=0 : this.index++;
    });
  };

  render() {
    return (
      <div>
        <h2><a href="../src/notes/列表&key.js">列表&key</a></h2>
        <button onClick={this.handleClick}>增加一行</button>
        <ul>
          {
            this.state.dataList.map(function (item) {
              return (
                  /**
                  * `key`帮助React识别哪些元素改变了，比如被添加或删除，是给每个元素赋予的唯一的确定的标识(最好为字符串)，
                  * 在同一组数据中`key`的值应是唯一的，最好是使用数据本身的唯一id，因为数组可能会变化，同一条数据所在索引在数组变动后可能就变了，
                  * 元素的`key`只有放在就近的数组上下文中才有意义，也就是说应放在最近的数组遍历中的元素上，而不是放在元素(若该元素未封装的组件)内部封装的元素上，
                  * `key`只需要在其兄弟节点之间唯一，不一定是全局唯一的（也就是只要同一个map循环中唯一就行了）
                  * `key`会传递信息给React，但其并不会传递给组件(尽管其作为属性放在元素上，但props中并不能访问到)，要传递给组件内部可以自定义一个其他属性来传递
                  * */
                  <li key={item.id}>{item.fruit}，￥{item.price}/斤</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default ListKey;