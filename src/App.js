import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchData } from "./actions/data";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Currency from './Currency';
import Converter from './Converter';


class App extends Component {
  componentDidMount() {
    this.props.fetchData("https://api.exchangeratesapi.io/latest?base=USD");
  }
  render() {
    const renderConverter = () =><Converter rates={this.props.rates}/>;
    const renderCurrency=()=><Currency rates={this.props.rates} />;
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the currency</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <Router><div className="App">
        <div>
          <Link to='/'><h1>Converter</h1></Link>
          <Link to='/currencies'><h1>All currencies</h1></Link>
        </div>
        <Route exact path='/' component={renderConverter}/>
        <Route path='/currencies' component={renderCurrency}/>

      </div></Router>
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
