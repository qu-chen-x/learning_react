
import React, { Component } from 'react'
import Snake from './component/Snake'
import Food from './component/Food'

//随机生成Food坐标
const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*max + min)/2)*2;
    let y = Math.floor((Math.random()*max + min)/2)*2;
    return [x,y];
    // let x = 48;
    // let y =Math.floor(Math.random() * x) * 2;
}
const iniitialState = {
        food:getRandomCoordinates(),
        speed:200,
        direction:'right',
        snakeDots:[
            [0,0],
            [2,0]
        ]
}
export default class App extends Component{
    
    state = iniitialState;
    //键盘事件
    componentDidMount() {
        setInterval(this.moveSnake,this.state.speed);
        document.onkeydown = this.onkeydown;
    }
    //更新状态
    componentDidUpdate(){
        this.checkIfOutBorders();
        this.checkIfEat();
        this.checkIfCollapsed();
    }
    //键盘函数
    onkeydown = (e) => {
        switch (e.keyCode){
            case 73:
                this.setState({direction:"up"});
                break;
            case 74:
                this.setState({direction:"left"});
                break;
            case 75:
                this.setState({direction:"down"});
                break;
            case 76:
                this.setState({direction:"right"});
                break;
        }
    }
    //移动贪吃蛇函数
    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];
        switch (this.state.direction){
            case "up":
                head = [head[0],head[1]-2];
                break;
            case "left":
                head = [head[0] - 2,head[1]];
                break;
            case "down":
                head = [head[0],head[1] + 2];
                break;
            case "right":
                head = [head[0] + 2,head[1]];
                break;
            default:
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots:dots
        })
    }
    //限制活动范围
    checkIfOutBorders(){
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if(head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0){
            this.onGameOver();
        }
    }
    //验证head是否撞击到自身
    checkIfCollapsed(){
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if(head[0] === dot[0] && head[1] === dot[1]){
                this.onGameOver();
            }
        })
    }
    //游戏结束
    onGameOver(){
        alert(`游戏结束，你的得分为：${this.state.snakeDots.length - 2}`);
        this.setState(iniitialState);
    }
    //验证是否吃到食物
    checkIfEat(){
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if(head[0] === food[0] && head[1] === food[1]){
            this.setState({
                food:getRandomCoordinates()
            })
            this.enlargtSnake();
            this.increaseSpeed();
        }
    }
    //填充贪吃蛇
    enlargtSnake(){
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots:newSnake
        });
    }
    //加速运动
    increaseSpeed(){
        if(this.state.speed > 10){
            this.setState({speed:this.state.speed - 10})
        }
    }
    render() {
        return (
            <div className = "game-area">
                <Snake snakeDots = {this.state.snakeDots}/>
                <Food food = {this.state.food}/>
            </div>
        )
    }
}
