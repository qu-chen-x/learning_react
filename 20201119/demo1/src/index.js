
import React, { Component } from 'react'           //处理逻辑
import ReactDOM from 'react-dom'    //将虚拟DOM渲染成真实DOM
import LifyCycle from './LifyCycle'
import ControlInput from './ControlInput'
import NoControlInput from './NoControlInput'
import FormSimple from './FormSimple'

//  const element = <h1>Hello,{1+1}</h1>;
//  ReactDOM.render(element, document.getElementById('root'));


//函数声明（函数式组件）
// function Welcome(props){
// return <h2>hello,{props.name}</h2>
// }

// ReactDOM.render(<Welcome name="Welcome"/>,document.querySelector("#root"));



//类声明（ES6）（在真实项目运用居多）
// class App extends React.Component{
//   render(){
//将jsx接收的属性转换为单个对象传递到组件，该对象即为props
//   return <h2>App,{this.props.name}</h2>
//   }
// }

// ReactDOM.render(<App name="Welcome"/>,document.querySelector("#root"));



//可通过快捷键rcc快速创建组件

//写法一：
// import React, { Component } from 'react'
//export default：抛出（类名）
// export default class index extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }

//写法二：
//import React from "react"
//   class index extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
// export default index;

//组合组件
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );



// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           src={props.author.avatarUrl}
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }



//State 与 props 类似，但是若使用props，则不可改变属性，
//而state 是私有的，完全受控于当前组件，可改变属性。

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );



//循环绑定元素使用map
// const arr = ['1','2','3'];
// const ulele = (<ul>
//   {
//     arr.map((item,index) => {
       //循环绑定的Jsx元素，必须要有key属性，用于区分不同的元素，否则会报错
//         return <li key={index}>{item}</li>
//       }
//     )
//   }
// </ul>)

// ReactDOM.render(
//   ulele,document.getElementById("root")
// );


//在react中对元素进行循环和过滤
// const goods = [
//   {id:1, price:500, title:"小米5手机"},
//   {id:2, price:800, title:"小米6手机"},
//   {id:3, price:1500, title:"小米8手机"},
//   {id:4, price:2500, title:"小米9手机"},
// ]
// const fliterEle = (<ul>
//   {goods.map((good,index) => {
//         return (good.price > 1000 ? <li key={good.id}> {good.title} </li>:null)
//   })
//   }
// </ul>)

// ReactDOM.render(
//   fliterEle,document.querySelector("#root")
// );



//复用组件的使用
// class MyBtn extends React.Component{
//   render() {
//     return (
//       <div>
//         <button>{this.props.title}</button>
//       </div>
//     )
//   }
// }

// class App extends React.Component{
//   constructor(props){
//     super(props);
//   }
    
//     render(){
//       return (
//         <div>
//           <h2>Hello</h2>
//           <MyBtn title='提交'></MyBtn>
//           <MyBtn title='修改'></MyBtn>
//           <MyBtn title='添加'></MyBtn>
//           <MyBtn title='删除'></MyBtn>
//         </div>
//       )
//     }
// }


//如何在react中提取组件
// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.user = { 
//       name : "qc",
//       content : "2333",
//       date : new Date().toLocaleDateString
//     }
//   }
    
//     render(){
//       return (
//         <div>
//          <div className = "comment">
//            <div className = "userinfo">
//                 <div className = "username">{this.user.name}</div>
//            </div>
//                 <div className = "content">{this.user.content}</div>
//                 <div className = "date">{this.user.date}</div>
//          </div>         
//         </div>
//       )
//     }
// }


// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.user = { 
//       name : "qc",
//       id:"20201120",
//       content : "2333",
//       comment_date:new Date().toLocaleTimeString()
//     }
//   }  
//     render(){
//       return (
//         <Comment user = {this.user}></Comment>
//       )
//     }
// }



// class Comment extends React.Component{
//   render(){
//     return (
//       <div className = "comment">
//             {/* <Userinfo user = {...this.props.user}></Userinfo> */}
//             {/* <Userinfo username = {this.props.user.name} userid = {this.props.user.id} content = {this.props.user.content} comment_date = {this.props.user.comment_date}></Userinfo> */}
//             <Userinfo user = {this.props.user}></Userinfo>
//             <Content user = {this.props.user}></Content>
//             <Comment_Date user = {this.props.user}></Comment_Date> 
//       </div>
//     )
//   }
// }

// class Userinfo extends React.Component{
//   render(){
//     return (
//            <div className = "userinfo">
//             <Username user = {this.props.user}></Username>
//             <Userid user = {this.props.user}></Userid>
//            </div>
//     )
//   }
// }
// class Username extends React.Component{
//   render(){
//     return (
//           <div className = "username">{this.props.user.name}</div>
//     )
//   }
// }

// class Userid extends React.Component{
//   render(){
//     return (
//           <div className = "userid">{this.props.user.id}</div>
//     )
//   }
// }

// class Content extends React.Component{
//   render(){
//     return (
//           <div className = "content">
//             评论内容：{this.props.user.content}</div>
//     )
//   }
// }
// class Comment_Date extends React.Component{
  
//   render(){

//     return (
//           <div className = "date">{this.props.user.comment_date}</div>
         
//     )
//   }
// }


// ReactDOM.render(<App/>,document.getElementById("root"));


//父组件调用子组件里的方法（在组件的复用关系中已体现，主要通过props进行传参）
//子组件调用父组件里的方法（在给子组件传参时，定义一个属性，
//该属性值为父组件中的某个方法，然后在子组件中Jsx对象所绑定的方法里调用该属性）
// class So extends React.Component{
//     soClick = () => {
//       this.props.fh('23333');
//   }

//   render() {
//     return(
//       <button onClick = {this.soClick}>子传父</button>
//     )
//   }
// }


// class Fa extends React.Component{
//     add(val){
//       alert(val)
//     }
//    render(){
//      return(
//        <div className = "relationship">
//        <So sth = {this.props} fh = {this.add}></So>
//        </div>
//      )
//    }
// }

// ReactDOM.render(<Fa/>,document.querySelector("#root"));

//除了可以在constructor里修改React的state之外
//修改状态的唯一方法是this.setState()
// export default class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       count:0
//     }
    // 方式一
    // 改变this指向
    // this.add = this.add.bind(this)
 // }
  // 方式一
  // add(){
  //   this.setState({
  //     count : this.state.count + 1
  //   })
  // }
  // 方式二
  // add = () => {
  //   this.setState({
  //     count : this.state.count + 1
  //   })
  // }
  // 方式三
  // add(){
  //   this.setState({
  //     count : this.state.count + 1
  //   })
  // }
  //  方式四
  // add(e){
  //   this.setState({
  //     count : this.state.count + 1
  //   })
  // }
//   render() {
//     return (
//       <div>
//         <h2>{this.state.count}</h2>
//         {/* 方式一： */}
//         {/* <button onClick = {this.add}>加一</button> */}
//         {/* 方式二: */}
//         {/* <button onClick = {this.add}>加一</button> */}
//         {/* 方式三： */}
//         <button onClick = {this.add.bind(this)}>加一</button>
//         {/* 方式四： */}
//         {/* <button onClick = {(e) => {this.add(e)}}>加一</button> */}
//       </div>
//     )}
// }
//     ReactDOM.render(<App/>,document.querySelector("#root"));


//setState方法的使用（只有类声明的组件里才有state）
//setState为异步操作
// export default class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       count:0
//     }
//     this.state.count = 1;
//   }
//   add(e){
    // console.log(e);
    //对象的方式
    // this.setState{
    //   count:this.state.count + 1
    // }
    //函数的方式
      //     this.setState((prevState,prevProps)=> ({
      //       count:prevState.count + 1
      // }),() => {
        //处理最新的结果
//         console.log(this.state.count);
//       }) 
//         }

//   render() {
//     return (
//       <div>
//         <h2>{this.state.count}</h2>
//         {/* 方式一： */}
//         {/* <button onClick = {this.add}>加一</button> */}
//         {/* 方式二: */}
//         {/* <button onClick = {this.add}>加一</button> */}
//         {/* 方式三： */}
//         {/* <button onClick = {this.add.bind(this)}>加一</button> */}
//         {/* 方式四： */}
//         <button onClick = {(e) => {this.add(e)}}>加一</button>
//       </div>
//     )
//   }
// }
//     ReactDOM.render(<App/>,document.querySelector("#root"));











// ReactDOM.render(<LifyCycle/>,document.querySelector("#root"));
//ReactDOM.render(<ControlInput/>,document.querySelector("#root"));
//ReactDOM.render(<NoControlInput/>,document.querySelector("#root"));
ReactDOM.render(<FormSimple/>,document.querySelector("#root"));