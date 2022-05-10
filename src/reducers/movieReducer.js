const intitialState = {
    movieData: []
  };
  const movieReducer = (state = intitialState, action) => {
    switch (action.type) {
      case "MOVIE_DATA":
        return {
          ...state,
          movieData: [...state.movieData, action.payload]
        };
      default:
        console.log(state);
        return state;
    }
  };
  
  export default movieReducer;
  