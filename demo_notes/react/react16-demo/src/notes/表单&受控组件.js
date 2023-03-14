import React from 'react';

/**===受控组件===
 * 在HTML中，表单元素(如输入框、文本域、下拉框、单复选框等)通常自己维护state(自己的状态值变化响应等功能是自带的)，只需要根据用户的操作就可更新自身状态(不需要额外封装方法响应用户操作才能改变值)。
 * 而在React中，可变状态(mutable state)通常保存在组件的`state`属性中，并只能通过使用`setState()`方法去更新。将表单的值变化与react中的状态更新原则结合起来，
 * 使得React组件中的`state`成为表单项值的`唯一数据源`，同时渲染表单的react组件还控制着用户输入过程中表单发生的变化操作，像这种被react控制取值的表单输入组件就称为`受控组件`
 * */
class FormWithCtrl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      sex: 1,   //设置默认值
      msg: ''
    };
  }

  handleChange = (e) => {
    // 多表单时，根据表单项的`name`属性存储对应表单项的值
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault(); //阻止默认提交行为，因为实际我们是使用ajax提交的

    console.log('提交数据：', this.state)
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/** 使用表单的`change`事件将表单的`value`与组件状态`state`关联在一起，使得表单变化受控(state成为表单的唯一数据源) */}
        {/** 注意单复选框的选中状态还是由`checked`属性控制的，对于输入型表单项若`value`已受控在未用change事件绑定修改输入内容时仍能自由输入，可能的原因是将value设置成了`undefined`或`null` */}
        <p>用户名：<input type="text" name="user" value={this.state.user} onChange={this.handleChange}/></p>

        {/** HTML中`select`中`option`上可以使用`select`属性表示默认选中项，但react中并不使用该属性，而是在根元素`select`标签上使用`value`属性，统一与`input`相同的使用方式 */}
        <p>性别为：
          {/* `select`要表示多选时可给`value`传入数组数据 */}
          <select name="sex" value={this.state.sex} onChange={this.handleChange}>
            <option value="0">女</option>
            <option value="1">男</option>
          </select>
        </p>

        {/** HTML中`textarea`的值是其内部文本，通过`innerText`获取，而在react中将其也封装为通过`value`属性获取与赋值(event.target.value)，使得使用方式与input一样 */}
        <p>留言板：<textarea name="msg" cols="30" rows="2" value={this.state.msg} onChange={this.handleChange}></textarea></p>

        <button type='submit'>提交</button>
      </form>
    );
  }
}

export default FormWithCtrl;