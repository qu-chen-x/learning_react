import React, { Component } from 'react'
import All_thing from './All_thing';
import Unfinish_thing from './Unfinish_thing';
import Thing_finish from './Thing_finish';
export default class Part3 extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <div className = "part_3">
                        <All_thing thing = {this.props.show_arr}/>
                        <Unfinish_thing thing = {this.props.show_arr}/>
                        <Thing_finish thing = {this.props.show_arr}/>
                </div>
            </div>
        )
    }
}
