export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",                                     //TypeS
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({            //THIS IS ERROR BUT NO FAILED WE WILL UPDATE THIS LIKE TRUE
    type: "LOGIN ARE FAILED",
  });
  
  export const Logout = () => ({
    type: "LOGOUT",
  });
  
  export const UpdateStart = (userCredentials) => ({
    type: "UPDATE START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE SUCCESS",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE FAILURE",
  });
  