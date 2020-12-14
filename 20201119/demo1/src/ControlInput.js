import React, { Component } from 'react'

//受控组件：受状态控制的组件，需要与状态进行相应的绑定
export default class ControlInput extends Component {
    constructor(props){
        super(props);
        //设置初始状态值
        this.state = {
            val:"",
            data:[]
        }
    }
    handleChange = (e) =>{
        let val = e.target.value;
        this.setState({
            val
        })
    }
    handleClick = () => {
        if(this.state.val){
            let newArr = [...this.state.data];
            newArr.push(this.state.val)
            this.setState({
                data:newArr
            })
            this.setState({
                val:''
            })
        }
    }
    render() {
        return (
            //调用组件时绑定状态值
            <div>
               <input type="text" value = {this.state.val} onChange = {this.handleChange}></input> 
               <button onClick = {this.handleClick}>添加数据</button>
               <ul>
                   {
                       this.state.data && this.state.data.map((item,i) => {
                           return (
                               <li key = {i} > {item}</li>
                           )
                       })
                   }
               </ul>
            </div>
        )
    }
}



