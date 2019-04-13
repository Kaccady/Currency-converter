import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchData } from "./actions/data";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Currency from "./Currency";
import Converter from "./Converter";

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
      <Router>
        <div className="App">
          <div className="wrap">
            <NavLink
              activeClassName="linkButtonActive"
              exact
              to="/"
              className="linkButton"
            >
              Converter
            </NavLink>
            <NavLink
              activeClassName="linkButtonActive"
              to="/currencies"
              className="linkButton"
            >
              All currencies
            </NavLink>
          </div>
          <Route exact path="/" component={Converter} />
          <Route path="/currencies" component={Currency} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
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
