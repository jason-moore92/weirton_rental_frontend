import axios from "axios";
import { BASE_URL } from "@/constants/index";
import Messages from "@/constants/Messages";

const Rental = {
  state: {
    contacts: [],
  },
  getters: {
    allContacts: (state) => {
      return state.contacts;
    },
  },
  actions: {
    //Submit rental contact form
    async submitForm({ state }, data) {
      const url = BASE_URL + "/rental/submit_form";
      const headers = {
        "Content-Type": "application/json",
      };

      return new Promise(function (resolve, reject) {
        axios
          .post(url, data, { headers })
          .then(function (response) {
            if (response && response.data) {
              if (response.data.result) {
                resolve(response.data);
              } else {
                reject(response.data.error);
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
    },

    //Get all contacts
    async getContacts({ commit }) {
      const url = BASE_URL + "/rental/";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      axios.defaults.headers.common["Authorization"] = token;
      let res = await axios.get(url);
      commit("setContacts", res.data);
    },

    //Update contacts
    async updateContact({ commit }, updatedContact) {
      const url = BASE_URL + "/rental/" + updatedContact._id;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(url, updatedContact);
      commit("updateContact", response.data);
    },

    //Delete contact
    async deleteContact({ commit }, id) {
      const url = BASE_URL + "/rental/" + id;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      axios.defaults.headers.common["Authorization"] = token;
      await axios.delete(url);
      commit("removeContact", id);
    },
  },
  mutations: {
    setContacts: (state, contacts) => (state.contacts = contacts),
    removeContact: (state, id) =>
      (state.contacts = state.contacts.filter((contact) => contact._id !== id)),
    updateContact: (state, updatedContact) => {
      // Find index
      const index = state.contacts.findIndex(
        (contact) => contact._id === updatedContact._id
      );
      if (index !== -1) {
        state.contacts.splice(index, 1, updatedContact);
      }
    },
  },
};

export default Rental;
