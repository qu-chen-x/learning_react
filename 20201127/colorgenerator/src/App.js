import React,{useState} from 'react';
import Values from 'values.js';
import SingleColor from './SingleColor';

function App() {
  //初始化state
  const [color,setColor] = useState('');
  const [list,setList] = useState([]);
  const [error,setError] = useState(false);
  //创建提交函数
  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      let colors = new Values(color).all(10);
      setList(colors);
      setError(false);
    }catch(error){
      setError(true);
      //console.log(error);
    }
  }
  //console.log(list);
  return (
    <>
    <section className = "container">
    <h3>颜色生成器</h3>
    <form onSubmit = {handleSubmit}>
      <input type = "text" placeholder = "#f15025" 
      onChange = {(e) => setColor(e.target.value)}
      className = {`${error ? 'error' : null}`}/>
      <button type = "submit" className = "btn">提交</button>
    </form>
    </section>
    <section className = "colors">
      {list.map((color,index) => {
        return (
          <SingleColor key = {index} color = {color}/>
        )
      })}
      </section>
    </>
  );
}

export default App;
