export function favouriteOptions(state = [], action) {
  switch (action.type) {
    case "SET_FAVOURITE":
      return action.favouriteOptions;
    default:
      return state;
  }
}
