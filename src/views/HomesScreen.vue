<template>
  <div class="main-page">
    <v-card class="mb-12 p-5">
      <div class="row label mb-3 pl-2 pr-2">Please selecct home address</div>
      <div class="row pl-2 pr-2">
        <v-select
          class="col-12"
          :items="allHomes"
          v-model="selectedHome['_id']"
          label="Home Address"
          outlined
          @change="onChangeHome"
        />
      </div>

      <v-divider />
      
      <div class="address-info mt-10">
        <div class="row  pl-2 pr-2">
          <v-text-field
            label="Address"
            v-model="selectedHome.address"
            outlined
            :rules="addressRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>

        <div class="row justify-content-between">
          <v-text-field
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            label="City"
            v-model="selectedHome.city"
            outlined
            :rules="cityRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-select
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            :items="stateData"
            v-model="selectedHome.state"
            label="State"
            outlined
            :rules="stateRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            label="Zip Code"
            v-model="selectedHome.zipcode"
            outlined
            :rules="zipRules"
            @input="checkValid"
            @change="checkValid"
          />
        <!-- </div>

        <div class="row justify-content-between"> -->
          <v-text-field
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            label="Country"
            v-model="selectedHome.country"
            outlined
            :rules="countryRules"
            @input="checkValid"
            @change="checkValid"
          />
          <v-text-field
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            label="MSA"
            v-model="selectedHome.msa"
            outlined
            :rules="msaRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-6 col-12 pl-2 pr-2"
            label="Tract Code"
            v-model="selectedHome.tractCode"
            outlined
            :rules="tractCodeRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>
      </div>

      <div class="row justify-content-end mt-3">
        <v-btn
          class="ml-2 mr-2 mb-3"
          color="primary"
          medium
          :disabled="disabledNew"
          @click="onNewHome"
        >
          Add New
        </v-btn>

        <v-btn
          class="ml-2 mr-2 mb-3"
          color="primary"
          medium
          :disabled="disabledUpdate"
          @click="onUpdateSelectedHome"
          >
            Update
        </v-btn>

         <v-btn
          class="ml-2 mr-2 mb-3"
          color="error"
          medium
          :disabled="this.selectedHome['_id'] == null"
          @click="onDeleteSelectedHome"
          >
            Delete
        </v-btn>
      </div>
    </v-card>

    <Loading
      v-if="isLoading"
      :active="true"
      loader="dots"
      :opacity="0.5"
      :is-full-page="true"
      color="#212529"
      />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import _ from "lodash";
import {mapActions} from 'vuex'

import { HouseholdApi } from '@/apis/household-api'
import {STATE_NAMES} from '@/constants';

const householdApi = new HouseholdApi();

export default {
  name: "HomesScreen",
  components: {
    Loading,
  },
  data () {
    return {
      isLoading: false,
      allHomes: [],
      selectedHome: {},
      disabledUpdate: true,
      disabledNew: true,
      stateData: STATE_NAMES,
      countryRules: [
        (value) => !!value || "Please input country.",
      ],
      msaRules: [
        (value) => !!value || "Please input msa.",
      ],
      tractCodeRules: [
        (value) => !!value || "Please input tract code.",
      ],
      addressRules: [
          (value) => !!value || "Please input address.",
      ],
      cityRules: [
          (value) => !!value || "Please input city.",
      ],
      stateRules: [
          (value) => !!value || "Please input state.",
      ],
      zipRules: [
          (value) => !!value || "Please input zip code.",
      ],
    }
  },
  mounted() {
    if(this.$store.state.household.allHomes.length > 0) {
      this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
      this.isLoading = false;
    }else{
      this.isLoading = true;
      this.getAllHomes().then((result)=> {
        this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
        console.log("allHomes", this.allHomes)
        this.isLoading = false;
      }).catch((err)=>{
        console.log(err);
        this.isLoading = false;
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllHomes',
    ]),
    onChangeHome(item){
      console.log("item", item)
      let index = this.allHomes.findIndex((home)=> home['_id'] == item)
      console.log("index", index)
      if(index>= 0){
        this.selectedHome = _.cloneDeep(this.allHomes[index])
      }
      console.log("selectedHome", this.selectedHome)
      this.checkValid();
    },
    checkValid() {
      let valid = true;

      // Check Country
      if (!(this.selectedHome.country && this.selectedHome.country.length > 0)) {
          valid = false;
      }

      // Check MSA
      if (!(this.selectedHome.msa && this.selectedHome.msa.length > 0)) {
          valid = false;
      }

      // Check Tract Code
      if (!(this.selectedHome.tractCode && this.selectedHome.tractCode.length > 0)) {
          valid = false;
      }

      
      // Check Address.
      if (!(this.selectedHome.address && this.selectedHome.address.length > 0)) {
          valid = false;
      }

      // Check City.
      if (!(this.selectedHome.city && this.selectedHome.city.length > 0)) {
          valid = false;
      }

      // Check State.
      if (!(this.selectedHome.state && this.selectedHome.state.length > 0)) {
          valid = false;
      }

      // Check Zip.
      if (!(this.selectedHome.zipcode && this.selectedHome.zipcode.length > 0)) {
          valid = false;
      }
  
      this.disabledNew = !valid;
      
      if (!(this.selectedHome['_id'])) {
        valid = false;
      }else{
        this.disabledUpdate = !valid;
      }
    },
    onNewHome(){
      this.selectedHome['_id'] == null;
      console.log("selectedHome", this.selectedHome)

      let index = this.allHomes.findIndex((home)=> 
        home.address.toLowerCase() == this.selectedHome.address.toLowerCase()
        && home.city.toLowerCase() == this.selectedHome.city.toLowerCase()
        && home.state.toLowerCase() == this.selectedHome.state.toLowerCase()
        && home.zipcode.toLowerCase() == this.selectedHome.zipcode.toLowerCase()
        && home.country.toLowerCase() == this.selectedHome.country.toLowerCase()
        && home.msa.toLowerCase() == this.selectedHome.msa.toLowerCase()
        && home.tractCode.toLowerCase() == this.selectedHome.tractCode.toLowerCase()
      )
      if(index >= 0){
        alert('Please input different address')
        return;
      }
      householdApi.addHome(this.selectedHome).then((result)=>{
        console.log("addHome", result)
        this.selectedHome = {
          ...result,
          "text": result.address,
          "value": result['_id'],
        }
        let allHomes = _.cloneDeep(this.allHomes)
        allHomes.push({
          ...result,
          "text": result.address,
          "value": result['_id'],
        })

        allHomes.sort((a, b)=>{
          let fa = a.address.toLowerCase(), fb = b.address.toLowerCase();
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })

        this.allHomes = allHomes

        this.$store.commit("setAllHomes", allHomes);
        this.checkValid();
      })
    },
    onUpdateSelectedHome(){
      householdApi.updateHome(this.selectedHome).then((result)=>{
        console.log("updateHome", {
          ...result,
          "text": result.address,
          "value": result['_id'],
        })
        this.selectedHome = result
        let allHomes = _.cloneDeep(this.allHomes)
        let index = allHomes.findIndex((home)=> home['_id'] == result['_id'])
        if(index >= 0){
          allHomes[index] = {
            ...result,
            "text": result.address,
            "value": result['_id'],
          };
        }else{
          allHomes.push({
            ...result,
            "text": result.address,
            "value": result['_id'],
          })
        }

        allHomes.sort((a, b)=>{
          let fa = a.address.toLowerCase(), fb = b.address.toLowerCase();
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })

        this.allHomes = allHomes
        this.$store.commit("setAllHomes", allHomes);
      })
    },
    onDeleteSelectedHome(){
      let allHomes = _.cloneDeep(this.allHomes)
      let index = allHomes.findIndex((home)=> home['_id'] == this.selectedHome['_id'])
      if(index >= 0){
        allHomes.splice(index, 1)
      }
      this.allHomes = allHomes
      this.selectedHome = {}
      this.$store.commit("setAllHomes", allHomes);
      householdApi.deleteHome(this.selectedHome).then((result)=>{
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';

  .main-page{
    padding:30px;
  }

</style>
