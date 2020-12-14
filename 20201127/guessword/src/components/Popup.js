import React from 'react'
import {checkWin} from '../helpers/helper';
const Popup = ({ correctLetters, wrongLetters, selectedWord, playAgain}) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    if(checkWin(correctLetters, wrongLetters, selectedWord) === "win"){
        finalMessage = "恭喜，输入正确！";
    } else if(checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
        finalMessage = "输入有误！";
        finalMessageRevealWord = `游戏单词为：${selectedWord}`
    }
    return (
        <div className = "popup-container" style = {finalMessage !== '' ? {display:'flex'} : {}}>
            <div className = "popup">
                <h2> { finalMessage } </h2>
                <h3> { finalMessageRevealWord } </h3>
                <button id = "play-button" onClick = {playAgain}>再玩一次</button>
            </div>
        </div>
    )
}

export default Popup
