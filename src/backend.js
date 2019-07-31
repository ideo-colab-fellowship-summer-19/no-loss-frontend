// All of the methods for interfacing with the backend
import { ENV_API } from "./config.js";
const API = ENV_API;
//"http://symbol-staging-env.my55mapsej.us-west-2.elasticbeanstalk.com/";
const CORS_HEADER = "SYMBOL-HEADER";
const CORS_ORIGIN = "*";

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

  static async getTeamInfo(address) {
    var params = "?address=" + address;
    let url = API + "/getTeamInfo" + params
    let result = await this.makeGetRequest(url)
    return result
  }

  static async getTeamPhoto(address) {
    var params = "?address=" + address;
    let url = API + "/getTeamPhoto" + params
    let result = await this.makeGetRequest(url)
    return result
  }
  
  // to Post
  // data = new FormData();
  // data.append("thing", thing)
  // result = makePostRequest("/route", data)
  // Example Methods

  // to Get

  // var params = "?discountCode=" + discountCode;
  // params += "&classId=" + classId;
  // let url = API + "/getDiscountValue" + params;
  // result = makeGetRequest(url)
}