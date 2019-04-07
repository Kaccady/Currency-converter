import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { FetchData } from "./actions/data";

const Currency = props => {
  const [currentValue, setCurrentValue] = useState(1);
  return (
    <div className="column">
      <h1>All currencies</h1>
      <input list="data" onChange={() => setCurrentValue(currentValue)} /><p>{currentValue}</p>
      <datalist id="data">
        {props.rates.map(item => (
          <option value={item.id} id={item.value} />
        ))}
      </datalist>
      {props.rates.map((item, index) => {
        return (
          <div className="oneCurrency" key={index}>
            <p>{"1"}</p>
            <p>{item.id + " ="}</p>
            <p>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    this.props.fetchData("https://api.exchangeratesapi.io/latest?base=USD");
  }
  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the currency</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div className="App">
        <Currency rates={this.props.rates} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let rates = [];
  let i = 0;
  for (let key in state.data.rates) {
    rates[i++] = { value: state.data.rates[key], id: key };
  }
  return {
    rates: rates,
    hasErrored: state.dataHasErrored,
    isLoading: state.dataIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(FetchData(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
