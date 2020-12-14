import React,{useContext} from 'react'
import { GlobalContext } from '../contexts/GlobalProvider';

const Balance = () => {
    //获取每个交易单数组
    const {transactions} = useContext(GlobalContext);
    //通过map()遍历获取每个交易单数组里的金额
    const amount = transactions.map(transaction => transaction.amount);
    //将获取到的金额通过reduce()进行累加，再通过toFixed()方法保留两位小数
    const total = amount.reduce((acc,item) => (acc += item),0).toFixed(2);
    return (
        <div>
            <h4>你的余额</h4>
            <h1>${total}</h1>
        </div>
    )
}

export default Balance;
