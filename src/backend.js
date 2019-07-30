// All of the methods for interfacing with the backend
import Users from "./store/users.js";
import {
  ENV_API,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET
} from "./constants.js";
import { STREAM_KEY, STREAM_APP_ID } from "./constants.js";
const API = ENV_API;
//"http://symbol-staging-env.my55mapsej.us-west-2.elasticbeanstalk.com/";
const CORS_HEADER = "SYMBOL-HEADER";
const CORS_ORIGIN = "*";
var stream = require("getstream");

export default class Backend {
  static updateFunctions = {};

  static async makePostRequest(endpoint, data) {
    let response = await fetch(API + endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        accept: "application/json",
        "Access-Control-Request-Headers": CORS_HEADER,
        "Access-Control-Allow-Origin": CORS_ORIGIN
      },
      body: data
    });
    const result = await response.json();
    console.log("response for ", endpoint, " : ", result);
    return result;
  }

  static async makeGetRequest(url) {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        accept: "application/json",
        "Access-Control-Request-Headers": CORS_HEADER,
        "Access-Control-Allow-Origin": CORS_ORIGIN
      }
    });
    const result = await response.json();
    return result;
  }

  // Example Methods

  static async getCardData(userInfo) {
    let userInfoCopy = JSON.parse(JSON.stringify(userInfo));
    console.log(userInfo);
    delete userInfoCopy["accessToken"];
    var data = new FormData();
    console.log(Users);
    data.append("userId", Users.auth.userId);
    data.append("jwtToken", Users.auth["accessToken"]["jwtToken"]);

    const result = Backend.makePostRequest("/getCardData", data);

    return result;
  }

  static async changeCardData(userInfo, stripeToken) {
    let userInfoCopy = JSON.parse(JSON.stringify(userInfo));
    console.log(userInfo);
    delete userInfoCopy["accessToken"];
    var data = new FormData();
    console.log(Users);
    data.append("userId", Users.auth.userId);
    data.append("jwtToken", Users.auth["accessToken"]["jwtToken"]);
    data.append("stripeToken", stripeToken)

    const result = Backend.makePostRequest("/changeCardData", data);

    return result;
  }

  static async saveUserInfo(userInfo) {
    console.log("upating user: ", userInfo);
    let userInfoCopy = JSON.parse(JSON.stringify(userInfo));
    delete userInfoCopy["accessToken"];
    delete userInfoCopy["userId"];
    var data = new FormData();
    userInfoCopy = JSON.stringify(userInfoCopy);
    data.append("userId", Users.auth.userId);
    data.append("userInfo", userInfoCopy);
    data.append("jwtToken", Users.auth["accessToken"]["jwtToken"]);

    const result = Backend.makePostRequest("/updateUser", data);
    return result;
  }
}