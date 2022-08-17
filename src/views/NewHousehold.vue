<template>
  <div class="main-page">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          Header of Household
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Address Info
        </v-stepper-step>

         <v-divider></v-divider>

        <v-stepper-step step="3">
          Other Household Memebers
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Income
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="5">
          Unit Rent
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="content-form">

        <v-stepper-content step="1">
          <HeadOfHouseholdForm 
            ref="headOfHouseholdForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <AddressInfoForm 
            ref="addressInfoForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>

        <v-stepper-content step="3">
          <OtherMemebersForm 
            ref="membersForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>

        <v-stepper-content step="4">
          <IncomeForm 
            ref="incomeForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>

        <v-stepper-content step="5">
          <UnitRentForm 
            ref="unitRentForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog
      v-model="showResultDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Thank you!
        </v-card-title>
        <v-card-text>Your submission has been sent!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="showResultDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Loading
      v-if="isSubmitting"
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


import {mapActions} from 'vuex'
import HeadOfHouseholdForm from "@/components/new_household/HeadOfHouseholdForm.vue";
import AddressInfoForm from "@/components/new_household/AddressInfoForm.vue";
import OtherMemebersForm from "@/components/new_household/OtherMemebersForm.vue";
import IncomeForm from "@/components/new_household/IncomeForm.vue";
import UnitRentForm from "@/components/new_household/UnitRentForm.vue";
import {TOAST_SHOW_TIME, FAMILY_TYPE, GENDER_TYPE } from "@/constants";
import { DASHBOARD } from '@/constants/path';
import * as RouterPath from "@/constants/path";
import { goto } from "@/helpers/functions";


export default {
  name: "NewHousehold",
  components: {
    HeadOfHouseholdForm,
    AddressInfoForm,
    OtherMemebersForm,
    IncomeForm,
    UnitRentForm,
    Loading,
  },
  data () {
    return {
      step: 1,
      showResultDialog: false,
      isSubmitting: false,
      form: {
        oldHome: {
          address: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          msa: '',
          tractCode: '',
        },
        newHome: {
          address: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          msa: '',
          tractCode: '',
        },
        members: [
          {
            firstName: '',
            lastName: '',
            birthday: '',
            gender: GENDER_TYPE.MALE,
            isStudent: 0,
          }
        ],
      },
    }
  },

  methods: {
    ...mapActions([
      'addNewHousehold',
    ]),

    onNext(step, data) {
      if (step === 1) {
        this.form.members[0].firstName = data.firstName;
        this.form.members[0].lastName = data.lastName;
        this.form.members[0].birthday = data.birthday;
        this.form.members[0].gender = data.gender;
        this.form.members[0].isStudent = data.isStudent;

        this.step = 2;
        console.log("form",this.form)
        this.$refs.addressInfoForm.initPage();
      }
      else if (step === 2) {
        this.form.oldHome = data.oldHome;
        this.form.newHome = data.newHome;
        this.step = 3;
        console.log("form",this.form)
        this.$refs.membersForm.initPage();
      } else if (step === 3) {
        this.form.members = [
          ...[this.form.members[0]],
          ...data.members
        ];
        console.log("form",this.form)
        console.log("data.members",data.members)
        this.$refs.incomeForm.initPage();
        this.step = 4;
      } else if (step === 4) {
        this.form.members = [
          ...data.members
        ];
        this.step = 5;
        console.log("form",this.form)
        this.$refs.unitRentForm.initPage();
      }else if (step === 5) {
        this.form.potentialRent = data.potentialRent;
        this.form.tenantRent = data.tenantRent;
        this.form.concession = data.concession;
        this.form.incomeLimit = data.incomeLimit;
        this.form.isVoucher = data.isVoucher;

        this.onSubmit();
      } 
    },

    onBack() {
      this.step = this.step - 1;
    },

    onSubmit() {
      this.isSubmitting = true
      this.addNewHousehold(this.form).then(data => {
      this.isSubmitting = false
        this.showResultDialog = true;
        goto(RouterPath.DASHBOARD);
        // this.resetForm();
      })
      .catch(error => {
        this.isSubmitting = false
        this.$toasted.error(error, {position: 'top-center', duration: TOAST_SHOW_TIME});
      });
    },

    resetForm() {
      this.step = 1;
      this.form = {
        oldHome: {
          address: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          msa: '',
          tractCode: '',
        },
        newHome: {
          address: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          msa: '',
          tractCode: '',
        },
        members: [
          {
            firstName: '',
            lastName: '',
            birthday: '',
            gender: GENDER_TYPE.MALE,
            isStudent: 0,
          }
        ],
      };

      this.$refs.headOfHouseholdForm.resetPage();
      this.$refs.addressInfoForm.resetPage();
      this.$refs.membersForm.resetPage();
      this.$refs.incomeForm.resetPage();
      this.$refs.unitRentForm.resetPage();

      window.location.reload();
    },
  },
}
</script>

<style lang="scss" scoped>
.content-form {
  ::v-deep {
    .v-sheet.v-card:not(.v-sheet--outlined) {
      border: 1px solid rgba(0 0 0 / 14%);
      max-width: 700px;
      margin: 50px auto;
    }

    @media (min-width: 768px) {
      .v-input.col-md-6  {
        max-width: 48%;
      }

       .v-input.col-md-4 {
        max-width: 31%;
      }
    }
  }  
}

::v-deep {
    .v-sheet.v-stepper:not(.v-sheet--outlined) {
      box-shadow: none;
    }
}  
</style>
