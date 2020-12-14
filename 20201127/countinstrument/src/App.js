import React from 'react';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import Header from './components/Header';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import GlobalProvider from './contexts/GlobalProvider';
      function App() {
        return (
          <GlobalProvider className = "App">
            <Header/>
            <div className = "container">
              <Balance/>
              <IncomeExpenses/>
              <TransactionList/>
              <AddTransaction/>
            </div>
          </GlobalProvider>
        )
      }

      export default App;
