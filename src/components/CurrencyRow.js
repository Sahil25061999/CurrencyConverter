import React from 'react';

const CurrencyRow = ({
  amount,
  currencyList,
  defaultCurrency,
  updateCurrCode,
  changeAmount,
}) => {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={changeAmount}
      />
      <select
        className="select"
        value={defaultCurrency}
        onChange={updateCurrCode}
      >
        {currencyList.map((currencyCode) => (
          <option key={currencyCode} value={currencyCode}>
            {currencyCode}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CurrencyRow;
