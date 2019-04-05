import React, { Component } from "react";
import fetchedCurrency from "./json";

const Currency = ({ props: { rates } }) => {
  for (let name in rates) {
    console.log(name);
    return <p>{name}</p>
  }
};
class App extends Component {
  state = { data: fetchedCurrency };

  render() {
    console.log(this.state.data.rates);
    return (
      <div className="App">
        <Currency props={this.state.data} />
      </div>
    );
  }
}

export default App;
