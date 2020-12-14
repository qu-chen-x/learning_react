import React, { Component } from 'react'
import Part2 from './Part2';
export default class Part1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            val:'',
            input_thing:[]
        }
    }
    handleChange = (e) => {
        this.setState({
            val:e.target.value
        });
    }
    handleClick = (e) => {
        e.preventDefault();
        //保证每次输入的值都被存进数组中
        let newArr = [...this.state.input_thing];
        if(this.state.val !== "" && !this.state.val.match(/^[ ]*$/)){
            newArr.push(this.state.val);
        }
        this.setState({
            val:'',
            input_thing:newArr
        });
    }
    render() {
        return (
            <div>
                <div className = "part_1">
                    <input type = "text" value = {this.state.val} onChange = {this.handleChange}/>
                    <button onClick = {this.handleClick}>保存</button> 
               </div>
                <Part2 arr = {this.state}/>
            </div>
        )
    }
}
