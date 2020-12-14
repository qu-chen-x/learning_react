import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class Unfinish_thing extends Component {
    constructor(props){
        super(props);
        this.state = {
            unth:[]
        }
    }
    handleClick = (e) => {
        let newArr = []
       const arr =document.getElementsByClassName('spans');
        for(let i=0;i<arr.length;i++){
            
            newArr.push(arr[i].innerText)
        }
        this.setState({
            unth:newArr
        });
       const uf = document.querySelector(".unfinish_thing");
       ReactDOM.findDOMNode(uf).style.display = "block";
       const tf = document.querySelector(".thing_finish");
       ReactDOM.findDOMNode(tf).style.display = "none";
       const at = document.querySelector(".all_thing");
       ReactDOM.findDOMNode(at).style.display = "none";
    }
    render() {
        return (
            <div>
                <ul className = "unfinish_thing"> 
                    {
                       this.state.unth.map((item,index) => {
                       return <li key = {index}>{item}</li>
                       })
                    }
                </ul>
                <button onClick = {this.handleClick}>未完成</button>
            </div>
        )
    }
}
