import React, { Component } from 'react'
import Part3 from './Part3';
export default class Part2 extends Component {
    constructor(props){
        super(props);
    }
    //选择待办事项并将其状态由未完成变为已完成
    handleClick1 = (e) => {
        e.target.parentElement.children[0].className = "item" 
    }

   //删除待办事项
    handleClick2 = (e) => {
        //获取待办事项的内容
        const text = e.target.parentElement.children[0].innerText;
        //获取待办事项内容下标（索引）
        const i = this.props.arr.input_thing.indexOf(text);
        //将待办事项删除后的剩余内容装入新数组，再将新数组赋值给原数组，实现“删除”效果
        const newArr = this.props.arr.input_thing.splice(i,1);
        this.setState({
             input_thing:newArr
        }
        )
    }
    render() {
        return (
            <div>
                <div className = "part_2">
                    <ul className = "show_list" id = "show_list">
                     {
                        this.props.arr.input_thing.map((item,index) => {
                            return <li key={index} className = "show_item" id = "show_item" >
                                        <span className = "spans" id = "item" onClick = {this.handleClick1}>
                                            {item}
                                        </span> 
                                        &nbsp;&nbsp;
                                        <span onClick = {this.handleClick2}>X</span>
                                   </li> 
                        })
                     } 
                    </ul>
                </div>
                <Part3 show_arr = {this.props.arr.input_thing}/>
            </div>
        )
    }
}
