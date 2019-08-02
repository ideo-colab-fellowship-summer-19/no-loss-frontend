// All of the methods for interfacing with the backend
import { ENV_API, ENV } from "./config.js";
const API = ENV_API;
//"http://symbol-staging-env.my55mapsej.us-west-2.elasticbeanstalk.com/";
const CORS_HEADER = "SYMBOL-HEADER";
const CORS_ORIGIN = "*";
let Backend;

function getFromLocalInternal(theKey) {
  console.log({ ...localStorage.getItem(theKey) })
  return JSON.parse(localStorage.getItem(theKey))
}

function setLocalInternal(theKey, item) {
  localStorage.setItem(theKey, JSON.stringify(item))
}

if (ENV === "devWithChain") {
  Backend = class {
    static updateFunctions = {};

    static async getFromLocal(theKey) {
      console.log({ ...localStorage.getItem(theKey) })
      return JSON.parse(localStorage.getItem(theKey))
    }

    static async setToLocal(theKey, item) {
      return JSON.parse(localStorage.setItem(theKey, item))
    }

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
} else if (ENV === "devNoChain") {
  console.log("We here boi")
  Backend = class {
    static updateFunctions = {};

    static async getFromLocal(theKey) {
      console.log({ ...localStorage.getItem(theKey) })
      return JSON.parse(localStorage.getItem(theKey))
    }

    static async setLocal(theKey, item) {
      localStorage.setItem(theKey, JSON.stringify(item))
    }

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
      return getFromLocalInternal(account).bees
    }

    static async setBees(account, bees) {
      let curUser = getFromLocalInternal(account)
      console.log("the user")
      console.log(curUser)
      curUser.bees = bees
      localStorage.setLocalInternal(account, curUser)
    }

    static async addBee(account, bee) {
      let curUser = getFromLocalInternal(account)
      curUser.bees = curUser.bees.push(bee)
      localStorage.setLocalInternal(account, curUser)
    }

    static async getPlantType(account) {
      let curUser = getFromLocalInternal(account)
      return curUser.plantType
    }

    static async setPlantType(account, plant) {
      let curUser = getFromLocalInternal(account)
      curUser.plantType = plant
      this.setLocal(account, curUser)
      return curUser.plantType
    }

    static async justPlanted(account) {
      let curUser = getFromLocalInternal(account)
      curUser.isPlanted = true
      this.setLocal(account, curUser)
      return curUser.plantType
    }

    static async isPlanted(account) {
      let curUser = getFromLocalInternal(account)
      return curUser.isPlanted
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