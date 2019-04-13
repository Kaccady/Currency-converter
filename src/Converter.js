import React, { useState } from "react";
import { connect } from "react-redux";

const Converter = ({ rates }) => {
  const [currentName, setCurrentName] = useState(
    rates[0] ? [rates[5].id, rates[3].id] : []
  );
  const [exchangeValue, setExchangeValue] = useState(
    rates[0] ? [rates[5].value, rates[3].value] : [99, 99]
  );
  const [value, SetValue] = useState(
    rates[0] ? [rates[5].value, rates[3].value.toFixed(4)] : [99, 99]
  );

  const Options = rates.map(({ id, value }) => (
    <option value={id} key={value}>
      {id}
    </option>
  ));
  const handleValue = event => {
    let inverse = Number(!Number(event.target.id));
    let newValue = value.slice();
    let prettyNumber = +(
      (exchangeValue[inverse] / exchangeValue[event.target.id]) *
      event.target.value
    ).toFixed(4);
    newValue.splice(event.target.id, 1, event.target.value);
    newValue.splice(inverse, 1, prettyNumber);
    SetValue(newValue);
  };

  const handleSetCurrentName = event => {
    let newCurrentName = currentName.slice();
    newCurrentName.splice(event.target.id, 1, event.target.value);
    setCurrentName(newCurrentName);
    let i = rates
      .map(item => {
        return item.id === event.target.value;
      })
      .indexOf(true);
    if (rates[i]) {
      let newValue = exchangeValue.slice();
      newValue.splice(event.target.id, 1, rates[i].value);
      setExchangeValue(newValue);
      let updateValue = value.slice();
      updateValue.splice(
        1,
        1,
        +((newValue[1] / newValue[0]) * value[0]).toFixed(4)
      );
      SetValue(updateValue);
    }
  };
  return (
    <div>
      {" "}
      <div className="column">
        <input id="0" type="number" value={value[0]} onChange={handleValue} />
        <input id="1" type="number" value={value[1]} onChange={handleValue} />
      </div>
      <div className="column">
        {" "}
        <select id="0" value={currentName[0]} onChange={handleSetCurrentName}>
          {Options}
        </select>
        <select id="1" value={currentName[1]} onChange={handleSetCurrentName}>
          {Options}
        </select>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    rates: state.data
  };
};
export default connect(mapStateToProps)(Converter);
