import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export default class All_thing extends Component {
    constructor(props){
        super(props);
        this.state = {
            al:[]
        }
    }
    handleClick = (e) => {
        this.setState({
            al:this.props.thing
        })
       const uf = document.querySelector(".unfinish_thing");
       
    //    ReactDOM.findDOMNode(uf).style.display = "none";
       const tf = document.querySelector(".thing_finish");
    //    ReactDOM.findDOMNode(tf).style.display = "none";
       const at = document.querySelector(".all_thing");
    //    ReactDOM.findDOMNode(at).style.display = "block";
       console.log(uf);
       console.log(tf);
       console.log(at);
    }
    render() {
        return (
            <div>
                <ul className = "all_thing"> 
                    {
                       this.state.al.map((item,index) => {
                       return <li key = {index}>{item}</li>
                       })
                    }
                </ul>
                <button onClick = {this.handleClick}>全部</button>
            </div>
        )
    }
}
