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
        return state;
    }
  };
  
  export default movieReducer;
  