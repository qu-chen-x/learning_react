import React from 'react';
import ReactDOM from 'react-dom';
// import Container from './Container';
// import Todo from './Todo';
var SetIntervalMixin = {
    componentWillMount: function() {
      this.intervals = [];
    },
    setInterval: function() {
      this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
      this.intervals.forEach(clearInterval);
    }
  };
  
  var createReactClass = require('create-react-class');
  
  
  var TickTock = createReactClass({
    mixins: [SetIntervalMixin], // 使用 mixin
    getInitialState: function() {
      return {seconds: 0};
    },
    componentDidMount: function() {
      this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
    },
    tick: function() {
      this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
      return (
        <p>
          React has been running for {this.state.seconds} seconds.
        </p>
      );
    }
  });
  
  ReactDOM.render(
    <TickTock />,
    document.getElementById('example')
  );
  
//ReactDOM.render(<Container/>,document.querySelector("#root"));
//ReactDOM.render(<Todo/>,document.querySelector("#root"));