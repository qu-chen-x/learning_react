import React, { Component } from 'react'
import Part1 from './Part1';
import './css/index.css' 
export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className = "container">
                <Part1/>
            </div>
        )
    }
}
