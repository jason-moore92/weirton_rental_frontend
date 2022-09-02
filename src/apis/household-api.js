import axios from "axios";
import { BASE_URL } from "@/constants/index";
import Messages from "@/constants/Messages";

export class HouseholdApi {
  async addNewHousehold(data) {
    const url = BASE_URL + "/household/new";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .post(url, data, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }

  async getAllHomes() {
    const url = BASE_URL + "/household/getAllHomes";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .get(url, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }

  async getAllHouseholdMembers() {
    const url = BASE_URL + "/household/getAllHouseholdMembers";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .get(url, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }

  async updateHome(home) {
    const url = BASE_URL + "/household/updateHome";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .post(url, home, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }

  async addHome(home) {
    const url = BASE_URL + "/household/addHome";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .post(url, home, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }

  async deleteHome(home) {
    const url = BASE_URL + "/household/deleteHome";
    const headers = {
      "Content-Type": "application/json",
    };

    return new Promise(function (resolve, reject) {
      axios
        .post(url, home, { headers })
        .then(function (response) {
          if (response && response.data) {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.data);
            }
          } else {
            reject(Messages.NetWorkError);
          }
        })
        .catch((error) => {
          console.log("getToken API error: ", error);
          reject(Messages.NetWorkError);
        });
    });
  }
}
