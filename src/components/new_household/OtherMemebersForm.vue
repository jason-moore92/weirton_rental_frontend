<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div v-for="(member, index) in members" :key="index" class="member-panel">
        <div class="d-flex justify-content-between mt-4">
          <v-text-field
            class="col-md-4 col-sm-12"
            label="First Name"
            v-model="member.firstName"
            outlined
            :rules="firstNameRules"
            @input="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-12"
            label="Last Name"
            v-model="member.lastName"
            outlined
            :rules="lastNameRules"
            @input="checkValid"
          />

          <v-text-field
            class="col-md-4 col-sm-12"
            label="Country"
            v-model="member.birthday"
            type="date"
            outlined
            :rules="birthdayRules"
            @input="checkValid"
          />
        </div>

        <div class="row justify-content-between mt-1">
          <div class="col-md-6 col-sm-12 row align-items-center"  style="padding: 0px; margin: 0px;">
            <div style="padding-right: 10px;">Gender</div>
            <v-radio-group v-model="member.gender" row>
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
          <div class="col-md-6 col-sm-12 row align-items-center"  style="padding: 0px; margin: 0px;">
            <div style="padding-right: 10px;">Is Student?</div>
            <v-radio-group v-model="member.isStudent" row align-items-center>
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
      </div>

      <div style="padding-top: 20px;">
        <v-btn
            color="primary"
            large
            @click="onAddNewMember"
        >
          Add New Memeber
        </v-btn>
      </div>

      <div class="row justify-content-end mt-3">
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
import {GENDER_TYPE} from '@/constants';

export default {
    name: "OtherMemebersForm",
    props: {
      data: Object,
      onNext: Function,
      onBack: Function,
    },
    data () {
      let householdInfo = _.cloneDeep(this.data)

      let members = [];
      for (let index = 1; index < householdInfo.members.length; index++) {
        members.push(householdInfo.members[index])
      }

      return {
        members: members,
        male: GENDER_TYPE.MALE,
        female: GENDER_TYPE.FEMALE,
        disabledNext: true,
        firstNameRules: [
            (value) => !!value || "Please input a valid first name.",
        ],
        lastNameRules: [
            (value) => !!value || "Please input a valid last name.",
        ],
        birthdayRules: [
          (value) => !!value || "Please select a birthday.",
        ],
      }
    },
    watch: {
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        let householdInfo = _.cloneDeep(this.data)
        let members = [];
        for (let index = 1; index < householdInfo.members.length; index++) {
          members.push(householdInfo.members[index])
        }
        this.members = members

        if(this.members.length == 0){
          this.onAddNewMember()
        }
        this.checkValid();
      },
      resetPage() {
        this.isStudent = 0;
      },
      onNextForm() {
        if (this.onNext) {
          this.onNext(3, {
            members: this.members,
          });
        }
      },
      checkValid() {
        let valid = true;
        for (const member of this.members) {
          // Check Birthday
          if (!(member.birthday && member.birthday.length > 0)) {
              valid = false;
              break;
          }

          // Check Gender
          if (!(member.gender && member.gender.length > 0)) {
              valid = false;
              break;
          }

          // Check first name.
          if (!(member.firstName && member.firstName.length > 0)) {
              valid = false;
              break;
          }

          // Check last name.
          if (!(member.lastName && member.lastName.length > 0)) {
              valid = false;
              break;
          }
        }

        this.disabledNext = !valid;
      },
      onAddNewMember(){
        this.members.push({
          firstName: "",
          lastName: "",
          birthday: "",
          gender: GENDER_TYPE.MALE,
          isStudent: 0,
        })
      }
    },
}
</script>
<style lang="scss" scoped>
  .member-panel {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(200, 195, 195);
  }
</style>