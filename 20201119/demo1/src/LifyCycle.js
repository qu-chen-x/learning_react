import React, { Component } from 'react'

export default class LifyCycle extends Component {

    static defaultProps = {
        name:"qc",
        age:"23",
    }
    constructor(props){
        super(props);
        console.log("1.初始化，加载默认状态");
        this.state = {
            count:0
        }
    }
    componentWillMount(){
        console.log("2.父组件将要被挂载");
    }
    componentDidMount(){
        //在当前的方法中，发起ajax请求，获取数据（数据驱动视图）
        console.log("4.父组件挂载完成");
    }
    shouldComponentUpdate(nextProps,nextState){
            //性能的优化点（重要）
            console.log("5.组件是否需要更新");
            if(nextState.count % 2 == 0){
                return true;
            }else{
                return false;
            }
    }
    componentWillUpdate(){
        console.log("7.组件将要更新");
    }
    componentDidUpdate(){
        console.log("8.组件更新完成");
    }
    componentUnmount(){
        console.log("9.组件写在完成");
    }
    handleClick = () => {
        this.setState((preveState,preveProps) => ({
            count:preveState.count + 1
        }),() => {
            console.log(this.state.count);
        })
    }
    render() {
        console.log("3.父组件渲染了");
        return (
            <div>
               <h2>当前的值：{this.state.count}</h2>
               <button onClick = {this.handleClick}>加一</button> 
               <SubCount count = {this.state.count}></SubCount>
            </div>
        )
    }
}
 
 
    class SubCount extends Component {
     componentWillReceiveProps(newProps){
         console.log("子组件将要接收新属性",newProps);
     }
     render() {
         return (
             <div>
                 
             </div>
         )
     }
 }
 