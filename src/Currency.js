import React, { useState, useReducer } from "react";

const Currency = ({ rates }) => {
  const initialProps = Array(rates.length).fill(false);

  const [currentName, setCurrentName] = useState("USD");
  const [exchangeValue, setExchangeValue] = useState(1);
  const [sendValue, setSendValue] = useState(1);

  const Options = rates.map(({ id, value }) => (
    <option value={id} key={value}>
      {id}
    </option>
  ));

  const [favouriteOptions, dispatch] = useReducer(
    (favouriteOptions, { type, newOptions }) => {
      switch (type) {
        case "setValue":
          return newOptions;
        default:
          return favouriteOptions;
      }
    },
    initialProps
  );

  const handleSetFavourite = index => {
    let newOptions = favouriteOptions.slice();
    newOptions.splice(index, 1, !favouriteOptions[index]);
    dispatch({ type: "setValue", newOptions });
  };

  const handleSetCurrentName = event => {
    setCurrentName(event.target.value);
    let i = rates
      .map(item => {
        return item.id === event.target.value;
      })
      .indexOf(true);
    if (rates[i]) {
      setExchangeValue(rates[i].value);
    }
  };

  return (
    <div className="column">
      <div>
        <input
          value={sendValue}
          onChange={event => setSendValue(event.target.value)}
        />
        <select
          value={currentName}
          onChange={handleSetCurrentName}
        >
          {Options}
        </select>
      </div>
      <div className="column">
        {rates.map(({ id, value }, index) => {
          return (
            <div
              className={
                favouriteOptions[index]
                  ? "activeCurrency oneCurrency"
                  : "oneCurrency"
              }
              key={index}
            >
              <p className='valueGetter'>{sendValue}</p>
              <p className='nameCurrency'>{id + " ="}</p>
              <p className='valueTranslator'>{Number(((sendValue * value) / exchangeValue).toFixed(4))}</p>
              <span
                id={index}
                onClick={() => handleSetFavourite(index)}
                className={+favouriteOptions[index]?'activeStar star':'star'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Currency;
