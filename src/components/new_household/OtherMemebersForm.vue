<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div v-for="(member, index) in members" :key="index" class="member-panel">
        <div class="row justify-content-between mt-4">
          <v-text-field
            class="col-md-6 col-sm-5 col-12"
            label="First Name"
            v-model="member.firstName"
            outlined
            :rules="firstNameRules"
            @input="checkValid"
            @change="checkValid"
          />

          <v-text-field
            class="col-md-6 col-sm-5 col-12"
            label="Last Name"
            v-model="member.lastName"
            outlined
            :rules="lastNameRules"
            @input="checkValid"
            @change="checkValid"
          />
        <!-- </div>

        <div class="row justify-content-between mt-4"> -->
          <v-text-field
            class="col-md-6 col-sm-5 col-12"
            label="Birthday"
            v-model="member.birthday"
            type="date"
            outlined
            :rules="birthdayRules"
            @input="checkValid"
            @blur="checkValid"
            @change="checkValid"
            @focus="checkValid"
            @keydown="checkValid"
          />

          <v-select
            class="col-md-6 col-sm-5 col-12"
            :items="memberTypes"
            v-model="member.type"
            label="Type"
            outlined
            :rules="memberRules"
            @input="checkValid"
            @change="checkValid"
          />
        </div>

        <div class="row justify-content-between mt-1">
          <div class="option-row"  style="padding: 0px; margin: 0px;">
            <div class="option-label">Gender</div>
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
        </div>
        
        <div class="row justify-content-between align-items-center mt-1 ">
          <div class="option-row"  style="padding: 0px; margin: 0px;">
            <div class="option-label">Is a student?</div>
            <v-radio-group v-model="member.isStudent" row>
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

          <div class="btn-delete-div">
            <v-btn icon class="btn-delete" @click="onRemoveMember(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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

      <div style="height: 10px;">&nbsp;</div>

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

import {isValidEmail, detectBrowser } from "@/helpers/functions";
import {GENDER_TYPE, MEMBER_TYPES} from '@/constants';

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
      memberTypes: MEMBER_TYPES,
      disabledNext: true,
      firstNameRules: [
          (value) => !!value || "Please input first name.",
      ],
      lastNameRules: [
          (value) => !!value || "Please input last name.",
      ],
      birthdayRules: [
        (value) => !!value || "Please select birthday.",
      ],
      memberRules: [
            (value) => !!value || "Please select type.",
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
            console.log("member.birthday",member.birthday)
            break;
        }else{
            console.log("member.birthday",member.birthday)
        }

        // Check Gender
        if (!(member.gender && member.gender.length > 0)) {
            valid = false;
            console.log("member.gender",member.gender)
            break;
        }

        // Check first name.
        if (!(member.firstName && member.firstName.length > 0)) {
            valid = false;
            console.log("member.firstName",member.firstName)
            break;
        }

        // Check last name.
        if (!(member.lastName && member.lastName.length > 0)) {
            console.log("member.lastName",member.lastName)
            valid = false;
            break;
        }

         // Check last name.
        if (!(member.type && member.type.length > 0)) {
            console.log("member.type",member.type)
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
        birthday: detectBrowser() == 'Safari'? "2000-01-01" : null,
        gender: GENDER_TYPE.MALE,
        isStudent: 0,
      })
      this.checkValid()
    },
    onRemoveMember(index){
      console.log("index",index)
      this.members.splice(index,1)
      this.checkValid()
    }
  },
}
</script>
<style lang="scss" scoped>
  .member-panel {
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid rgb(200, 195, 195);
  }

  .btn-delete {
    color: red !important;

    span, i {
      color: red !important;
    }
  }

  .option-row{
    padding-top: 0px !important;
    display: flex;
    align-items: center;
  }

  .option-label {
    width: 100px;
    padding-right: 0px;
  }

  .btn-delete-div{
  }

  @media screen and (max-width: 400px) {
    .option-label {
      width: max-content;
      padding-right: 10px;
    } 

    .btn-delete-div{
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

  @media screen and (max-width: 360px) {
    .option-row{
      padding-top: 10px !important;
      display: block;
    }
  }
</style>