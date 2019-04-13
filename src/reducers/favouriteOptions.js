export function favouriteOptions(state=Array(33).fill(false),action) {
  switch (action.type) {
    case "SET_FAVOURITE":
      return action.newOptions;
    default:
      return state;
  }
}
