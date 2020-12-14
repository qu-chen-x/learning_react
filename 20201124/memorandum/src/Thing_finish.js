import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class Finish_thing extends Component {
    constructor(props){
        super(props);
        this.state = {
            th:[]
        }
    }
    handleClick = (e) => {
        let newArr = [];
       const arr =document.getElementsByClassName('item');
        for(let i=0;i<arr.length;i++){
            
            newArr.push(arr[i].innerText);
            console.log(newArr);
        }
        this.setState({
            th:newArr
        })
        const uf = document.querySelector(".unfinish_thing");
        ReactDOM.findDOMNode(uf).style.display = "none";
        const tf = document.querySelector(".thing_finish");
        ReactDOM.findDOMNode(tf).style.display = "block";
        const at = document.querySelector(".all_thing");
        ReactDOM.findDOMNode(at).style.display = "none";
    }
    render() {
        return (
            <div>
                <ul className = "thing_finsh"> 
                    {
                       this.state.th.map((item,index) => {
                       return <li key = {index}>{item}</li>
                       })
                    }
                </ul>
               <button onClick = {this.handleClick}>已完成</button> 
            </div>
        )
    }
}
