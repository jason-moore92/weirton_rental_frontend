<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div class="row justify-content-between mt-4">
        <v-text-field
          class="col-md-6 col-sm-5 col-12"
          label="Potential Rent"
          v-model="householdInfo.potentialRent"
          outlined
          :rules="potentialRentRules"
          type="number"
        />

        <v-text-field
          class="col-md-6 col-sm-5 col-12"
          label="Tenant Rent"
          v-model="householdInfo.tenantRent"
          outlined
          :rules="tenantRentRules"
          type="number"
        />
      <!-- </div>

      <div class="row justify-content-between mt-4"> -->
         <v-text-field
          class="col-md-6 col-sm-5 col-12"
          label="Concession"
          v-model="householdInfo.concession"
          outlined
          :rules="concessionRules"
          type="number"
        />

        <v-text-field
          class="col-md-6 col-sm-5 col-12"
          label="Income Limit"
          v-model="householdInfo.incomeLimit"
          outlined
          :rules="incomeLimitRules"
          type="number"
        />
      </div>

       
      <div class="row align-items-center"  style="padding: 0px; margin: 0px;">
        <div style="padding-right: 10px;">Voucher</div>
        <v-radio-group v-model="householdInfo.isVoucher" row>
          <v-radio
            label="Yes"
            :value=1
          />
          <v-radio
            class="multi-radio"
            label="No"
            :value=0
          />
        </v-radio-group>
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
            Submit
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import _ from "lodash";

import {isValidEmail} from "@/helpers/functions";
import {GENDER_TYPE} from '@/constants';

export default {
    name: "UnitRentForm",
    props: {
      data: Object,
      onNext: Function,
      onBack: Function,
    },
    data () {
      return {
        male: GENDER_TYPE.MALE,
        female: GENDER_TYPE.FEMALE,
        disabledNext: true,
        householdInfo: _.cloneDeep(this.data),
        potentialRentRules: [
            (value) => !!value || "Please input potential rent.",
        ],
        tenantRentRules: [
            (value) => !!value || "Please input tenant rent.",
        ],
        concessionRules: [
          (value) => !!value || "Please input concession.",
        ],
        incomeLimitRules: [
            (value) => !!value || "Please input income limit.",
        ],
      }
    },
    watch: {
      'householdInfo.potentialRent': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.tenantRent': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.concession': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.incomeLimit': function (newValue, oldValue) {
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
        this.householdInfo = _.cloneDeep(this.data)
        if(!this.householdInfo.isVoucher)
          this.householdInfo.isVoucher = 0
        this.checkValid();
      },

      resetPage() {
        this.householdInfo.potentialRent = ''
        this.householdInfo.tenantRent = ''
        this.householdInfo.concession = ''
        this.householdInfo.incomeLimit = ''
        this.householdInfo.isVoucher = 0
      },
      onNextForm() {
        if (this.onNext) {
          this.onNext(5, this.householdInfo);
        }
      },
      checkValid() {
        let valid = true;

        // Check Birthday
        if (!(this.householdInfo.potentialRent && this.householdInfo.potentialRent.length > 0)) {
            valid = false;
        }

        // Check Gender
        if (!(this.householdInfo.tenantRent && this.householdInfo.tenantRent.length > 0)) {
            valid = false;
        }

        // Check first name.
        if (!(this.householdInfo.concession && this.householdInfo.concession.length > 0)) {
            valid = false;
        }

        // Check last name.
        if (!(this.householdInfo.incomeLimit && this.householdInfo.incomeLimit.length > 0)) {
            valid = false;
        }

        this.disabledNext = !valid;
      },
    },
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
  .v-label {
    margin: 0px;
  }
</style>