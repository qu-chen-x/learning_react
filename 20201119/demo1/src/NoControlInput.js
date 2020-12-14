import React, { Component } from 'react'
//非受控组件：不受状态控制的组件
export default class NoControlInput extends Component {
    constructor(props){
        super(props);
        //设置初始状态值
        this.state = {
            val:''
        }
    }
    handleChange = (e) => {
        //console.log(this.refs.a);
        let val = this.refs.value;
        this.setState({val})
    }
    render() {
        return (
            //为React中实现双向绑定的一种方法
            <div>
              <input type = "text" onChange = {this.handleChange} ref = 'a'></input> 
              <h2>{this.state.val}</h2> 
            </div>
        )
    }
}
