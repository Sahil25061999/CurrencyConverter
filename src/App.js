import React, { useState, useEffect } from 'react';
import CurrencyRow from './components/CurrencyRow';
import './App.css';

const BASE_URL = 'exchangeratesapi.io'; //use api from exchangeratesapi.io

function App() {
  const [fromInput, setFromInput] = useState();
  const [toInput, setToInput] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [changeInFrom, setChangeInFrom] = useState(true);

  let fromAmount, toAmount;
  if (changeInFrom) {
    fromAmount = amount;
    toAmount = exchangeRate * fromAmount;
  } else {
    toAmount = amount;
    fromAmount = toAmount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const defaultcurr = Object.keys(data.rates)[66];
        const toDefaultCurrency = Object.keys(data.rates)[66];
        setCurrencyList([...Object.keys(data.rates)]);
        setFromInput(data.base);
        setExchangeRate(data.rates[defaultcurr]);
        setToInput(toDefaultCurrency);
      });
  }, []);

  useEffect(() => {
    if (fromInput != null && toInput != null && changeInFrom == true) {
      fetch(`${BASE_URL}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toInput]));
    } else if (fromInput != null && toInput != null) {
      fetch(`${BASE_URL}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[fromInput]));
    }
  }, [fromInput, toInput]);

  const handleFromChange = (e) => {
    setAmount(e.target.value);
    setChangeInFrom(true);
  };

  const handleToChange = (e) => {
    setAmount(e.target.value);
    setChangeInFrom(false);
  };

  return (
    <div className="App">
      <h1 className="title">Currency Converter</h1>
      <CurrencyRow
        amount={fromAmount}
        currencyList={currencyList}
        defaultCurrency={fromInput}
        updateCurrCode={(e) => setFromInput(e.target.value)}
        changeAmount={handleFromChange}
      />

      <h1 className="equal">=</h1>

      <CurrencyRow
        amount={toAmount}
        currencyList={currencyList}
        defaultCurrency={toInput}
        updateCurrCode={(e) => setToInput(e.target.value)}
        changeAmount={handleToChange}
      />
    </div>
  );
}

export default App;
