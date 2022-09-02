import { HouseholdApi } from '@/apis/household-api'

const householdApi = new HouseholdApi();

const Rental = {
  state: {
    allHomes: [],
    allHouseholdMembers: [],
  },
  
  mutations: {
    setAllHomes: (state, allHomes)=>{ 
      state.allHomes = allHomes
    },
    setAllHouseholdMembers: (state, allHouseholdMembers) => {
      state.allHouseholdMembers = allHouseholdMembers
    },
  },
  actions: {
    async getAllHomes({ state, commit }, data) {
      let result = await householdApi.getAllHomes();

      let allHomes = []
      for (const home of result) {
        allHomes.push({
          ...home,
          "text": home.address,
          "value": home['_id'],
        })
      }

      allHomes.sort((a, b) => {
        let fa = a.address.toLowerCase(), fb = b.address.toLowerCase();
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })

      commit("setAllHomes", allHomes);
      return allHomes
    },
    async getAllHouseholdMembers({ state, commit }, data) {
      let result = await householdApi.getAllHouseholdMembers();

      let allHouseholdMembers = []
      for (const member of result) {
        allHouseholdMembers.push({
          ...member,
          "text": member.firstName + ' ' +member.lastName,
          "value": member['_id'],
        })
      }

      allHouseholdMembers.sort((a, b) => {
        let fa = a.text.toLowerCase(), fb = b.text.toLowerCase();
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })

      commit("setAllHouseholdMembers", allHouseholdMembers);
      return allHouseholdMembers
    }
  },
  getters: {

  },
};

export default Rental;
