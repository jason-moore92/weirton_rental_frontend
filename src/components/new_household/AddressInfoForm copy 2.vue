<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div class="label mb-3">Old Address</div>
      <v-row class="old-address" style="padding-bottom: 10px;">
        <v-autocomplete
          class="col-12 autocomplete"
          :items="allHomes"
          clearable
          filled
          label="Filled"
          @change="onChangeOldHome"
          @click:clear="onClearOldHome"
        />

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Address:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.address}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">City:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.city}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">City:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.city}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">State:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.state}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Zipcode:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.zipcode}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Country:&nbsp;</span>
          <span>{{householdInfo.oldHome.country}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Tract Code:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.tractCode}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">MSA:&nbsp;</span>
          <span class="value">{{householdInfo.oldHome.msa}}</span>
        </div>
      </v-row>
      <v-divider />
      <div class="label mb-3">New Address</div>
      <v-row class="old-address" style="padding-bottom: 10px;">
        <v-autocomplete
          class="col-12 autocomplete"
          :items="allHomes"
          clearable
          filled
          label="Filled"
          @change="onChangeNewHome"
          @click:clear="onClearNewHome"
        />

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Address:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.address}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">City:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.city}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">City:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.city}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">State:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.state}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Zipcode:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.zipcode}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Country:&nbsp;</span>
          <span>{{householdInfo.newHome.country}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">Tract Code:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.tractCode}}</span>
        </div>

        <div class="col-md-6 col-sm-6 col-12">
          <span class="label">MSA:&nbsp;</span>
          <span class="value">{{householdInfo.newHome.msa}}</span>
        </div>
      </v-row>

      <div class="d-flex justify-content-end mt-3">
        <v-btn
          class="mr-3"
          color="normal"
          large
          @click="onBack"
        >
          Back
        </v-btn>

        <v-btn
            color="primary"
            large
            :disabled="disabledNext"
            @click="onNextForm"
        >
            Next
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import _ from "lodash";

import {isValidEmail} from "@/helpers/functions";
import {STATE_NAMES} from '@/constants';

export default {
  name: "AddressInfoForm",
  props: {
    data: Object,
    onNext: Function,
    onBack: Function,
  },
  data () {
    return {
      homeValue: null,
      disabledNext: true,
      stateData: STATE_NAMES,
      householdInfo: _.cloneDeep(this.data),
      // allHomes: this.$store.state.household.allHomes,
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
  watch: {
    
    'householdInfo.oldHome.country': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.msa': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.tractCode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.address': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.city': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.state': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.oldHome.zipcode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.country': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.msa': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.tractCode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.address': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.city': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.state': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'householdInfo.newHome.zipcode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },
  },
  mounted() {
    this.initPage();
  },
  computed: {
    allHomes(){
      return this.$store.state.household.allHomes
    }
  },
  methods: {
    initPage() {
      this.householdInfo = _.cloneDeep(this.data);
      this.checkValid();
    },
    resetPage() {
      this.householdInfo.oldHome = {
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        msa: '',
        tractCode: '',
      };
      this.householdInfo.newHome = {
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        msa: '',
        tractCode: '',
      };
    },
    onNextForm() {
      if (this.onNext) {
        
        this.onNext(2, this.householdInfo);
      }
    },
    checkValid() {
      let valid = true;

      // Check Country
      if (!(this.householdInfo.oldHome.country && this.householdInfo.oldHome.country.length > 0)) {
          valid = false;
      }

      // Check MSA
      if (!(this.householdInfo.oldHome.msa && this.householdInfo.oldHome.msa.length > 0)) {
          valid = false;
      }

      // Check Tract Code
      if (!(this.householdInfo.oldHome.tractCode && this.householdInfo.oldHome.tractCode.length > 0)) {
          valid = false;
      }

      
      // Check Address.
      if (!(this.householdInfo.oldHome.address && this.householdInfo.oldHome.address.length > 0)) {
          valid = false;
      }

      // Check City.
      if (!(this.householdInfo.oldHome.city && this.householdInfo.oldHome.city.length > 0)) {
          valid = false;
      }

      // Check State.
      if (!(this.householdInfo.oldHome.state && this.householdInfo.oldHome.state.length > 0)) {
          valid = false;
      }

      // Check Zip.
      if (!(this.householdInfo.oldHome.zipcode && this.householdInfo.oldHome.zipcode.length > 0)) {
          valid = false;
      }

      // Check Country
      if (!(this.householdInfo.newHome.country && this.householdInfo.newHome.country.length > 0)) {
          valid = false;
      }

      // Check MSA
      if (!(this.householdInfo.newHome.msa && this.householdInfo.newHome.msa.length > 0)) {
          valid = false;
      }

      // Check Tract Code
      if (!(this.householdInfo.newHome.tractCode && this.householdInfo.newHome.tractCode.length > 0)) {
          valid = false;
      }

      
      // Check Address.
      if (!(this.householdInfo.newHome.address && this.householdInfo.newHome.address.length > 0)) {
          valid = false;
      }

      // Check City.
      if (!(this.householdInfo.newHome.city && this.householdInfo.newHome.city.length > 0)) {
          valid = false;
      }

      // Check State.
      if (!(this.householdInfo.newHome.state && this.householdInfo.newHome.state.length > 0)) {
          valid = false;
      }

      // Check Zip.
      if (!(this.householdInfo.newHome.zipcode && this.householdInfo.newHome.zipcode.length > 0)) {
          valid = false;
      }

      this.disabledNext = !valid;
    },
    onChangeOldHome(item){
      console.log("")
      let index = this.allHomes.findIndex((home)=> home['_id'] == item)
      if(index>= 0){
        this.householdInfo.oldHome = _.cloneDeep(this.allHomes[index])
      }
      this.checkValid();
    },
    onClearOldHome(){
      this.householdInfo.oldHome = {}
      this.checkValid();
    },
    onChangeNewHome(item){
      let index = this.allHomes.findIndex((home)=> home['_id'] == item)
      if(index>= 0){
        this.householdInfo.newHome = _.cloneDeep(this.allHomes[index])
      }
      this.checkValid();
    },
    onClearNewHome(){
      this.householdInfo.newHome = {}
      this.checkValid();
    },
  },
}
</script>
<style lang="scss" scoped>
  .row {
    margin: 0px !important;
  }
  .label{
    padding-bottom: 10px;
  }

  .label{
    padding-bottom: 10px;
    font-weight: bold;
  }
</style>

<style lang="scss">
  .autocomplete {
    .v-text-field__details {
      display: none !important;
    }
  }
</style>