import React, { Component } from "react";
import fetchedCurrency from "./json";

const Currency = ({ props: { rates } }) => {
  for (let id in rates){return (<p>{id}</p>)}
}

class App extends Component {
  state = { data: fetchedCurrency };
  render() {
    const clone = {};
    for (let key in this.state.data.rates) {
      clone.id = key;
      clone.value = this.state.data.rates[key];
      console.log(clone);
    }
    return (
      <div className="App"><Currency props={this.state.data}/></div>
    );
  }
}

export default App;
