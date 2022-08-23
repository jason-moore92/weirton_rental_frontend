<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div class="row justify-content-between mt-1">
        <v-text-field
          class="col-md-6 col-sm-12 col-12"
          label="First Name"
          v-model="householdInfo.firstName"
          outlined
          :rules="firstNameRules"
          @input="checkValid"
          @change="checkValid"
        />

        <v-text-field
          class="col-md-6 col-sm-12 col-12"
          label="Last Name"
          v-model="householdInfo.lastName"
          outlined
          :rules="lastNameRules"
          @input="checkValid"
          @change="checkValid"
        />
      </div>

      <div class="row justify-content-between mt-4">
         <v-text-field
          class="col"
          label="Birthday"
          v-model="householdInfo.birthday"
          type="date"
          outlined
          :rules="birthdayRules"
          @input="checkValid"
          @change="checkValid"
        />
      </div>

      <div class="row justify-content-between mt-4">
        <div class="col-md-6 col-sm-12 col-12 option-row"  style="padding: 0px; margin: 0px;">
          <div class="option-label">Gender</div>
          <v-radio-group v-model="householdInfo.gender" row>
            <v-radio
              label="Male"
              :value="male"
            />
            <v-radio
              class="multi-radio"
              label="Female"
              :value="female"
            />
          </v-radio-group>
        </div>
        <div class="col-md-6 col-sm-12 col-12 option-row"  style="padding: 0px; margin: 0px;">
          <div class="option-label">Is a student?</div>
          <v-radio-group v-model="householdInfo.isStudent" row>
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
      </div>

      <div class="d-flex justify-content-end mt-3">
        <!-- <v-btn
          class="mr-3"
          color="normal"
          large
          @click="onBack"
        >
          Back
        </v-btn> -->
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
import {GENDER_TYPE, MEMBER_TYPES} from '@/constants';

export default {
    name: "HeadOfHouseholdForm",
    props: {
      data: Object,
      onNext: Function,
      onBack: Function,
    },
    data () {
      return {
        male: GENDER_TYPE.MALE,
        female: GENDER_TYPE.FEMALE,
        memberTypes: MEMBER_TYPES,
        disabledNext: true,
        householdInfo: _.cloneDeep(this.data.members[0]),
        firstNameRules: [
            (value) => !!value || "Please input first name.",
        ],
        lastNameRules: [
            (value) => !!value || "Please input last name.",
        ],
        birthdayRules: [
          (value) => !!value || "Please select birthday.",
        ],
        addressRules: [
            (value) => !!value || "Please input address.",
        ],
      }
    },
    watch: {
      'householdInfo.birthday': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.gender': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.isStudent': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.firstName': function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.checkValid();
        }
      },

      'householdInfo.lastName': function (newValue, oldValue) {
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
        this.householdInfo = _.cloneDeep(this.data.members[0])
        this.checkValid();
      },

      resetPage() {
        this.householdInfo.firstName = ''
        this.householdInfo.lastName = ''
        this.householdInfo.birthday = ''
        this.householdInfo.gender = GENDER_TYPE.MALE
        this.householdInfo.isStudent = 0
      },
      onNextForm() {
        if (this.onNext) {
          this.onNext(1, this.householdInfo);
        }
      },
      checkValid() {
        let valid = true;

        // Check Birthday
        if (!(this.householdInfo.birthday && this.householdInfo.birthday.length > 0)) {
            valid = false;
        }

        // Check Gender
        if (!(this.householdInfo.gender && this.householdInfo.gender.length > 0)) {
            valid = false;
        }

        // Check first name.
        if (!(this.householdInfo.firstName && this.householdInfo.firstName.length > 0)) {
            valid = false;
        }

        // Check last name.
        if (!(this.householdInfo.lastName && this.householdInfo.lastName.length > 0)) {
            valid = false;
        }

        this.disabledNext = !valid;
      },
    },
}
</script>
<style lang="scss" scoped>
  .option-row{
    display: flex;
    align-items: center;
  }
  
  .option-label {
    width: 100px;
    padding-right: 0px;
  }
  

  @media screen and (max-width: 400px) {
    .option-label {
      width: max-content;
      padding-right: 10px;
    } 
  }

  @media screen and (max-width: 360px) {
    .option-row{
      display: block;
    }
  }
</style>
<style lang="scss">
  .v-label {
    margin: 0px;
  }
  
</style>