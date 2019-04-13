import React, { useState } from "react";
import { connect } from "react-redux";
import { setFavourite } from "./actions/favouriteOptions";

const Currency = ({ rates, favouriteOptions }) => {
  const [currentName, setCurrentName] = useState("USD");
  const [exchangeValue, setExchangeValue] = useState(1);
  const [sendValue, setSendValue] = useState(1);

  const Options = rates.map(({ id, value }) => (
    <option value={id} key={value}>
      {id}
    </option>
  ));

  const handleSetFavourite = index => {
    let newOptions = favouriteOptions.slice();
    newOptions.splice(index, 1, !favouriteOptions[index]);
    setFavourite(newOptions);
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
        <select value={currentName} onChange={handleSetCurrentName}>
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
              <p className="valueGetter">{sendValue}</p>
              <p className="nameCurrency">{id + " ="}</p>
              <p className="valueTranslator">
                {Number(((sendValue * value) / exchangeValue).toFixed(4))}
              </p>
              <span
                id={index}
                onClick={() => handleSetFavourite(index)}
                className={
                  +favouriteOptions[index] ? "activeStar star" : "star"
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    rates: state.data,
    favouriteOptions: state.favouriteOptions
  };
};
const mapDispatchToProps =  newOptions => {
  return { type: "setValue", newOptions };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currency);
