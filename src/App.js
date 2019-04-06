import React, { Component } from "react";
import fetchedCurrency from "./json";

/*const Currency = ({ props: { rates } }) => {
  const CurrencyList = () => {
    for (let name in rates) {
      console.log(name, rates[name]);
      return <p>{"2".toString()}</p>;
    }
  };
  return <div>{ CurrencyList }</div>;
};*/
const Currency = ({props:{id,value}}) => 
  <p>
    валюта: {id} значение: {value}
  </p>;

const CurrencyList =({ props: { rates } }) => {
  for (let name in rates){
    return(
    <Currency props={({id:name,value:rates[name]})}/>);}}


class App extends Component {
  state = { data: fetchedCurrency };
  render() {
    return (
      <div className="App">
        <CurrencyList props={this.state.data} />
        {CurrencyList}
      </div>
    );
  }
}

export default App;
