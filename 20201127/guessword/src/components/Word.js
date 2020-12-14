import React from 'react'

const Word = ({ selectedWord, correctLetters }) => {
    return (
        <div id = "word" className = "word">
              {
              selectedWord.split("").map((letter,i) => 
              <span className = "letter" key = {i}>
                  { correctLetters.includes(letter) ? letter : "" }
              </span>)
              }
        </div>
    )
}

export default Word
