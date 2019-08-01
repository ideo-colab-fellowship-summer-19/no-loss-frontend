// All of the methods for interfacing with the backend
import { ENV_API, ENV } from "./config.js";
const API = ENV_API;
//"http://symbol-staging-env.my55mapsej.us-west-2.elasticbeanstalk.com/";
const CORS_HEADER = "SYMBOL-HEADER";
const CORS_ORIGIN = "*";
let Backend;

if (ENV === "devNoChain") {
  Backend = class {
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
} else {
  Backend = class {
    static updateFunctions = {};

    static async getTeamInfo(address) {
      let result = {
        members: ["0x6e14e8534f48f15b8f2518a07fa60e90b887a538, 0x1111e8534f48f15b8f2518a07fa60e90b887a538, \
        0x2222e8534f48f15b8f2518a07fa60e90b887a538"],
        name: "The Squad",
        totalSeeds: 121
      }
      return result
    }

    static async getTeamPhoto(address) {
      // TODO:
      let result = "dummy"
      return result
    }

    static async getBees(account) {
      return localStorage.getItem(account).bees
    }

    static async setBees(account, bees) {
      let curUser = localStorage.getItem(account)
      curUser.bees = bees
      localStorage.setItem(account, curUser)
    }

    static async addBee(account, bee) {
      let curUser = localStorage.getItem(account)
      curUser.bees = curUser.bees.push(bee)
      localStorage.setItem(account, curUser)
    }

    static async getPlantType(account) {
      let curUser = localStorage.getItem(account)
      return curUser.plantType
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
}

export default Backend