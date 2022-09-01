<template>
  <v-dialog
    v-model="showEditDialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title class="home-title">
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text class="pb-1 mt-4">
        <v-container style="padding: 0px">
          <v-row>
            <v-col cols="12" class="item pt-1 pb-1">
              <v-text-field
                label="Address"
                v-model="homeAddressInfo.address"
                outlined
                :rules="addressRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            >
              <v-text-field
                label="City"
                v-model="homeAddressInfo.city"
                outlined
                :rules="cityRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            >
              <v-select
                :items="stateData"
                v-model="homeAddressInfo.state"
                label="State"
                outlined
                :rules="stateRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            > 
              <v-text-field
                label="Zip Code"
                v-model="homeAddressInfo.zipcode"
                outlined
                :rules="zipRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            > 
              <v-text-field
                label="Country"
                v-model="homeAddressInfo.country"
                outlined
                :rules="countryRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            > 
              <v-text-field
                label="MSA"
                v-model="homeAddressInfo.msa"
                outlined
                :rules="msaRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="item pt-1 pb-1"
            > 
              <v-text-field
                label="Tract Code"
                v-model="homeAddressInfo.tractCode"
                outlined
                :rules="tractCodeRules"
                @input="checkValid"
                @change="checkValid"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-6">
        <v-spacer></v-spacer>
        <v-btn
          class="mr-3"
          color="normal"
          @click="onCancel"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          :disabled="disabledNext"
          @click="onSubmitForm"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";

import {STATE_NAMES} from '@/constants';

export default {
  name: "HomeAddressForm",
  props: {
    isNewHome: Boolean,
    title: String,
    homeData: Object,
    data: Object,
  },
  data () {
      console.log("this.homeData", this.homeData)

    return {
      showEditDialog: true,
      disabledNext: true,
      stateData: STATE_NAMES,
      homeAddressInfo: this.homeData? _.cloneDeep(this.homeData): {},
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
    'homeAddressInfo.country': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.msa': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.tractCode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.address': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.city': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.state': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },

    'homeAddressInfo.zipcode': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkValid();
      }
    },
  },
  mounted() {
    this.checkValid()
  },
  methods: {
    onCancel(){
      this.$emit('closeDialog')
    },
    onSubmitForm() {
      if(this.isNewHome){
        let index = this.allHomes.findIndex((home)=> 
          home.address.toLowerCase() == this.homeAddressInfo.address.toLowerCase()
          && home.city.toLowerCase() == this.homeAddressInfo.city.toLowerCase()
          && home.state.toLowerCase() == this.homeAddressInfo.state.toLowerCase()
          && home.zipcode.toLowerCase() == this.homeAddressInfo.zipcode.toLowerCase()
          && home.country.toLowerCase() == this.homeAddressInfo.country.toLowerCase()
          && home.msa.toLowerCase() == this.homeAddressInfo.msa.toLowerCase()
          && home.tractCode.toLowerCase() == this.homeAddressInfo.tractCode.toLowerCase()
        )
        if(index >= 0){
          alert('Please input different address')
          return;
        }
      }

      console.log("this.homeAddressInfo", this.homeAddressInfo)
      this.$emit('closeDialog')
      this.$emit('onDone', this.homeAddressInfo)
    },
    checkValid() {
      let valid = true;

      // Check Country
      if (!(this.homeAddressInfo.country && this.homeAddressInfo.country.length > 0)) {
          valid = false;
      }

      // Check MSA
      if (!(this.homeAddressInfo.msa && this.homeAddressInfo.msa.length > 0)) {
          valid = false;
      }

      // Check Tract Code
      if (!(this.homeAddressInfo.tractCode && this.homeAddressInfo.tractCode.length > 0)) {
          valid = false;
      }

      
      // Check Address.
      if (!(this.homeAddressInfo.address && this.homeAddressInfo.address.length > 0)) {
          valid = false;
      }

      // Check City.
      if (!(this.homeAddressInfo.city && this.homeAddressInfo.city.length > 0)) {
          valid = false;
      }

      // Check State.
      if (!(this.homeAddressInfo.state && this.homeAddressInfo.state.length > 0)) {
          valid = false;
      }

      // Check Zip.
      if (!(this.homeAddressInfo.zipcode && this.homeAddressInfo.zipcode.length > 0)) {
          valid = false;
      }

      this.disabledNext = !valid;
    },
  },
}
</script>
<style lang="scss" scoped>
  .home-title {
    text-align: center !important;
  }

  .item{
    // padding-top: 0px !important;
  }

  .row {
    margin: 0px !important;
  }
  .label{
    padding-bottom: 10px;
  }
</style>