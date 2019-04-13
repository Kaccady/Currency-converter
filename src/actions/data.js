export function dataHasErrored(bool) {
  return {
    type: "DATA_HAS_ERRORED",
    hasErrored: bool
  };
}

export function dataIsLoading(bool) {
  return {
    type: "DATA_IS_LOADING",
    isLoading: bool
  };
}

export function FetchDataSuccess(data) {
  let rates = [];
  let i = 0;
  for (let key in data.rates) {
    rates[i++] = { value: data.rates[key], id: key };
  }
  return {
    type: "FETCH_DATA_SUCCESS",
    rates
  };
}

export function FetchData(url) {
  return dispatch => {
    dispatch(dataIsLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(dataIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(FetchDataSuccess(data)))
      .catch(() => dispatch(dataHasErrored(true)));
  };
}
