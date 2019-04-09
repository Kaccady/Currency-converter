import React, { useState } from "react";
const Currency = props => {
  const [currentName, setCurrentName] = useState("USD");
  const [exchangeValue, setExchangeValue] = useState(1);
  const [sendValue, setSendValue] = useState(1);
  const [isFavorite, setIsFavorite] = useState([1, , 0, 0, , , , , ,]);
  return (
    <div className="column">
      <div>
        <input
          value={sendValue}
          onChange={event => setSendValue(event.target.value)}
        />
        <input
          value={currentName}
          list="data"
          onClick={() => {
            setCurrentName("");
          }}
          onChange={event => {
            setCurrentName(event.target.value);
            let i = props.rates
              .map(item => {
                return item.id === event.target.value;
              })
              .indexOf(true);
            if (props.rates[i]) {
              console.log(props.rates[i].value);
              setExchangeValue(props.rates[i].value);
            }
          }}
        />
      </div>
      <datalist id="data">
        {props.rates.map(item => (
          <option value={item.id} key={item.value} />
        ))}
      </datalist>
      {props.rates.map((item, index) => {
        return (
          <div
            className={
              (isFavorite[index]) ? "activeCurrency oneCurrency" : "oneCurrency"
            }
            key={index}
          >
            <p>{sendValue}</p>
            <p>{item.id + " ="}</p>
            <p>{(sendValue * item.value) / exchangeValue}</p>
            <p>{currentName}</p>
            <span
              id={index}
              onClick={event => {
                let a = isFavorite;
                console.log(a[event.target.id]);
                console.log(isFavorite[event.target.id]);
                if(a[event.target.id]){
                    a.splice(event.target.id,1,false);
                    setIsFavorite(a);
                }else{
                    a.splice(event.target.id,1,true);
                    setIsFavorite(a);
                }
              }}
              className="star"
            />
          </div>
        );
      })}
    </div>
  );
};
export default Currency;
