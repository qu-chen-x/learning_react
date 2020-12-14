import React,{useContext} from 'react'
import {GlobalContext} from "../contexts/GlobalProvider";
const Transaction = ({transaction}) => {
    const {dispatch} = useContext(GlobalContext);
    const sign = transaction.amount < 0 ? "-" : "+";
    return (
        <div>
                <li key = {transaction.id} className = {transaction.amount < 0 ? "minus" : "plus"}>
                    {transaction.text}    <span> {sign} $ {Math.abs(transaction.amount)} </span>
                    <button className = "delete-btn" onClick = {() => dispatch({type: 'DELETE_TRANSACTION',id:transaction.id})}>X</button>
                </li> 
        </div>
    )
}

export default Transaction;
