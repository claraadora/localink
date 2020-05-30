import axios from "axios";

//Takes in a token from local storage
const setAuthToken = (token) => {
  //If the token is present, add it to the header
  //Else delete it
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log(token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
