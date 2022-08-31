<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div class="old-address" style="padding-bottom: 10px;">
        <div class="label mb-3">Old Address</div>
        <v-select
          class="col-12"
          :items="allHomes"
          label="Old Address"
          outlined
          @change="onChangeOldHome"
        />
        <div class="row">
          <v-text-field
            label="Address"
            v-model="householdInfo.oldHome.address"
            outlined
            :rules="addressRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>

        <div class="row justify-content-between">
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="City"
            v-model="householdInfo.oldHome.city"
            outlined
            :rules="cityRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-select
            class="col-md-4 col-sm-5 col-12"
            :items="stateData"
            v-model="householdInfo.oldHome.state"
            label="State"
            outlined
            :rules="stateRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Zip Code"
            v-model="householdInfo.oldHome.zipcode"
            outlined
            :rules="zipRules"
            @input="checkValid"
            @change="checkValid"
          />
        <!-- </div>

        <div class="row justify-content-between"> -->
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Country"
            v-model="householdInfo.oldHome.country"
            outlined
            :rules="countryRules"
            @input="checkValid"
            @change="checkValid"
          />
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="MSA"
            v-model="householdInfo.oldHome.msa"
            outlined
            :rules="msaRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Tract Code"
            v-model="householdInfo.oldHome.tractCode"
            outlined
            :rules="tractCodeRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>
      </div>

      <div class="new-address">
        <div class="label mb-3">New Address</div>
        <v-select
          class="col-12"
          :items="allHomes"
          label="New Address"
          outlined
          @change="onChangeNewHome"
        />
        <div class="row">
          <v-text-field
            label="Address"
            v-model="householdInfo.newHome.address"
            outlined
            :rules="addressRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>

        <div class="row justify-content-between">
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="City"
            v-model="householdInfo.newHome.city"
            outlined
            :rules="cityRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-select
            class="col-md-4 col-sm-5 col-12"
            :items="stateData"
            v-model="householdInfo.newHome.state"
            label="State"
            outlined
            :rules="stateRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Zip Code"
            v-model="householdInfo.newHome.zipcode"
            outlined
            :rules="zipRules"
            @input="checkValid"
            @change="checkValid"
          />
        <!-- </div>

        <div class="row justify-content-between"> -->
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Country"
            v-model="householdInfo.newHome.country"
            outlined
            :rules="countryRules"
            @input="checkValid"
            @change="checkValid"
          />
          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="MSA"
            v-model="householdInfo.newHome.msa"
            outlined
            :rules="msaRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-5 col-12"
            label="Tract Code"
            v-model="householdInfo.newHome.tractCode"
            outlined
            :rules="tractCodeRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>
      </div>

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
      disabledNext: true,
      stateData: STATE_NAMES,
      householdInfo: _.cloneDeep(this.data),
      allHomes: this.$store.state.household.allHomes,
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
      let index = this.allHomes.findIndex((home)=> home['_id'] == item)
      if(index>= 0){
        this.householdInfo.oldHome = _.cloneDeep(this.allHomes[index])
      }
      this.checkValid();
    },
    onChangeNewHome(item){
      let index = this.allHomes.findIndex((home)=> home['_id'] == item)
      if(index>= 0){
        this.householdInfo.newHome = _.cloneDeep(this.allHomes[index])
      }
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
</style>