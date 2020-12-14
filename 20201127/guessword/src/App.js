import React ,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotifications  as show} from './helpers/helper';
//游戏的单词数组
const words = ["application", "programming", "interface", "wonder", "apple" ];

//随机生成游戏单词
let selectedWord = words[Math.floor(Math.random() * words.length)];
function App() {

  //初始化state
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [palyable, setPlayable] = useState(false);
  useEffect(() => {
    const handleKeydown = e =>{
      const { key, keyCode } = e;
      if(keyCode >= 65 && keyCode <= 90){
            const letter = key.toLowerCase();
            //判断用户按下的字母是否在随机生成的游戏单词里面
            if(selectedWord.includes(letter)){
                  //不能重复出现
                  if(!correctLetters.includes(letter)){
                    setCorrectLetters(correctLetters => [...correctLetters,letter]);
                  } else {
                    //显示警告信息
                    show(setShowNotification);
                  }
            } else {
                  //不能重复出现
                  if(!wrongLetters.includes(letter)){
                    setWrongLetters(wrongLetters => [...wrongLetters,letter]);
                  } else {
                    //显示警告信息
                    show(setShowNotification);
                  }
            }
            
      }
    }
    window.addEventListener('keydown',handleKeydown);
    return () => window.removeEventListener('keydown',handleKeydown)
    }
  ,[correctLetters, wrongLetters])

  //重置游戏
    function playAgain(){
      setPlayable(true);
      //清空数组
      setCorrectLetters([]);
      setWrongLetters([]);
      //随机生成单词
      const randoms = Math.floor((Math.random() * words.length));
      selectedWord = words[randoms];
    }

  return (
    <div className = "App">
      <Header />
      <div className = "game-container">
      <Figure wrongLetters = { wrongLetters }/>
        <WrongLetters wrongLetters = { wrongLetters }/>
        <Word selectedWord = { selectedWord } correctLetters = { correctLetters }/>
      </div>
        <Popup selectedWord = { selectedWord } correctLetters = { correctLetters } wrongLetters = { wrongLetters } playAgain = {playAgain}/>
        <Notification showNotification = {showNotification}/>
    </div>
  );
}

export default App;
