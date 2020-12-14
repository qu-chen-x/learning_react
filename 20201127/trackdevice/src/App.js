        import React, { Component } from 'react';
        import {Cards, Chart, CountryPicker} from './components';
        import Styles from './App.module.css';
        import {fetchData} from './api'
        import coronaImage from './images/image.png';
        class App extends Component {
          state = {
            data:{},
            coutry:''
          }

          async componentDidMount() {
            const data = await fetchData();
            this.setState({data});
          }
          handleCountryChange = async (country) => {
            const data = await fetchData(country);
            this.setState({
              data,country
            })
          }
          render() {
            // 写法一：
            return (
              <div className = {Styles.container}>
                <img src = {coronaImage} className = {Styles.image} alt = "COVID_!("/>
                <Cards data = {this.state.data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Chart data = {this.state.data} country = {this.state.country}/>
              </div>
            );

            // 写法二：
            // const {data,country} = this.state;
            // return (
            //   <div className = {Styles.container}>
            //     <Cards data = {data}/>
            //     <CountryPicker handleCountryChange = {this.handleCountryChange}/>
            //     <Chart data = {data} country = {country}/>
            //   </div>
            // );

          }
        }
        export default App;
