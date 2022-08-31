import { HouseholdApi } from '@/apis/household-api'

const householdApi = new HouseholdApi();

const Rental = {
  state: {
    allHomes: [],
  },
  
  mutations: {
    setAllHomes: (state, allHomes)=>{ 
      state.allHomes = allHomes
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
    }
  },
  getters: {

  },
};

export default Rental;
