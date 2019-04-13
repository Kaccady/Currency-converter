export function setFavourite(newOptions) {
  return {
    type: "SET_FAVOURITE",
    favouriteOptions: newOptions
  };
}
