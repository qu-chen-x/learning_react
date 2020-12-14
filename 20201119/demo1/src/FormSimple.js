import React, { Component } from 'react'

export default class FormSimple extends Component {
    constructor(props){
        super(props);
        //设置初始状态值
        this.state = {
            username:'',
            password:'',
            selectedArr:[]
        }
    }

    handleUsername = (e) => {
        this.setState({
            username:e.target.value
        })
    }
    handlePassword = (e) => {
        this.setState({
            password:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.username && this.state.password && this.state.selectedArr && this.state.selectedArr.length > 0){
            let arr = this.state.selectedArr.map(n => (`${n}`));
            //发送ajax请求
            alert(`当前用户名：${this.state.username}，密码：${this.state.password}，我的爱好：${arr}`)
        }
    }
    handleSelectedChange = (e) => {
        let newArr = [...this.state.selectedArr];
        newArr.push(e.target.value);
        this.setState({
            selectedArr:newArr
        })
    }
    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <p className = "username">
                    <label htmlFor = "name">用户名：</label>
                    <input type = "text" value = {this.state.username} onChange = {this.handleUsername} id = "username"/>
                </p>
                <br/>
                <p className = "password">
                    <label htmlFor = "pwd">密码：</label>
                    <input type = "text" value = {this.state.password} onChange = {this.handlePassword} id = "password"/>
                </p>
                    <br/>
                    我的爱好：
                    <select multiple value = {this.state.selectedArr} onChange = {this.handleSelectedChange}>
                    <option value = "sing">唱歌</option>
                    <option value = "dancing">跳舞</option>
                    <option value = "reading">阅读</option>
                    </select>
                    <br/>
                    <input type = "submit" value = "登录"></input>
               
            </form>
        )
    }
}
