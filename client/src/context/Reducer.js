const Reducer = (state, action) => {      //WE WILL DISPATCH AND UPDATE OUR STATE HERE
    switch (action.type) {                //WE WILL USE ALL THE POSSIBILITY switch block FROM CONTEXT.JS action(fiele name).type(type: "LOGIN_SUCCESS",)
      case "LOGIN START":
        return {
          user: null,
          isFetching: true,
          error: false,                        //NO ERRO BECAUSE WE STILL FETCHING
        };
      case "LOGIN SUCCESS":
        return {
          user: action.payload,
          isFetching: false,                  //WE EILL STOP FITCHING FOR THAT FALSE
          error: false,
        };
      case "LOGIN FAILURE":
        return {
          user: null,
          isFetching: false,               //IN THIS CASE NO FETCH ANYMORE
          error: true,
        };
        case "UPDATE START":
          return {
            ...state,
            isFetching:true
          };
        case "UPDATE SUCCESS":
          return {
            user: action.payload,
            isFetching: false,
            error: false,
          };
        case "UPDATE FAILURE":
          return {
            user: state.user,
            isFetching: false,
            error: true,
          };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  