import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const Converter = ({ rates }) => {
  const [currentName, setCurrentName] = useState([]);
  const [exchangeValue, setExchangeValue] = useState();
  const [value, SetValue] = useState([]);
  const [load, setLoad] = useState(false);
  const converterGenerator = () => {
    if ((rates[0] !== undefined) & (load === false)) {
      setLoad(true);
      setCurrentName([rates[5].id, rates[3].id]);
      setExchangeValue([rates[5].value, rates[3].value]);
      SetValue([rates[5].value, rates[3].value.toFixed(4)]);
    }
  };

  useEffect(() => converterGenerator());

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
    let inverse = Number(!Number(event.target.id));
    let newValue = exchangeValue.slice();
    let updateValue = value.slice();

    if (event.target.value === currentName[inverse]) {
      newCurrentName.reverse();
      newValue.reverse();
    } else {
      newCurrentName.splice(event.target.id, 1, event.target.value);

      let i = rates
        .map(item => {
          return item.id === event.target.value;
        })
        .indexOf(true);

      newValue.splice(event.target.id, 1, rates[i].value);
    }

    updateValue.splice(
      1,
      1,
      +((newValue[1] / newValue[0]) * value[0]).toFixed(4)
    );

    setCurrentName(newCurrentName);
    setExchangeValue(newValue);
    SetValue(updateValue);
  };
  return (
    <div>
      <div className="column">
        <input id="0" type="number" value={value[0]} onChange={handleValue} />
        <input id="1" type="number" value={value[1]} onChange={handleValue} />
      </div>
      <div className="column">
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
