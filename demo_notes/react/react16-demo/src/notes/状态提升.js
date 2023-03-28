import React from 'react';

/**===状态提升===
 * 对于各自组件中的状态因为都是私有的，当某些组件中的状态存在关联时就无法横向通信进行数据关联，这时将需要关联的组件中的状态都提升到最近的共同父组件中，
 * 将原来子组件中的状态通过父组件向子组件传递属性值的方式在子组件内部使用需要的数据，这时因为子组件的关联数据都来自父组件，可在父组件进行关联逻辑处理，也就达到了子组件间数据关联的目的
 * */
// 华氏度转换为摄氏度
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// 摄氏度转换为华氏度
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

/** 将温度输入组件TemperatureInput中的状态提升到了父组件StateToUp中 */
class TemperatureInput extends React.Component {
  /** 可以不要`constructor`，因为没什么额外内容设置 */
  handleChange = (e) => {
    this.props.onChange(e.target.name, e.target.value);
  };

  componentDidMount(){
    // 若温度输入组件有初始化值，则需要在挂载后执行一次值改变的回调
    if (this.props.value) this.props.onChange(this.props.name, this.props.value);
  }

  render(){
    return (
      <input type="number" {...this.props} onChange={this.handleChange}/>
    );
  }
}

const names = {
  c: 'celsius',
  f: 'fahrenheit'
};

class StateToUp extends React.Component {
  constructor(props) {
    super(props);

    // 可以不声明`state`中的具体数据项，但至少需要给`state`置为空对象
    // 下面的实现是两个温度值都保存了，实际也可以只保存一个温度和温度对应的单位标识(都可变，根据当前输入对应输入框来设定)，然后根据当前单位标识和温度值计算另一个温度
    // 原则上能由`props`或`state`推导出的数据就不应再存在`state`中
    this.state = {};
  }

  handleChange = (name, value) => {
    let stateObj = {};
    if (name===names.c){
      stateObj[name] = value;
      stateObj[names.f] = toFahrenheit(value);

    }else if (name===names.f) {
      stateObj[name] = value;
      stateObj[names.c] = toCelsius(value);
    }
    this.setState(stateObj);
  };

  handleSubmit = () => {
    console.log('提交数据：', this.state)
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2><a target="_blank" href="../src/notes/状态提升.js">状态提升</a></h2>
        {/** 因温度输入组件中的状态都提升到了父组件，改由父组件传递属性给子组件，使得两个温度组件中的值可关联 */}
        <TemperatureInput name={names.c} value={this.state[names.c] || 38} onChange={this.handleChange}/><span style={{marginLeft: '5px'}}>℃</span>
        <span style={{margin: '0 10px'}}>=</span>
        <TemperatureInput name={names.f} value={this.state[names.f] || ''} onChange={this.handleChange}/><span style={{marginLeft: '5px'}}>℉</span>
      </form>
    );
  }
}

export default StateToUp;