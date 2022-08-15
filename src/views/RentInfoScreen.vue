<template>
  <div class="main-page">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          Property Owner
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          Rental Property Building Info
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Rent Units
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="content-form">
        <v-stepper-content step="1">
          <ContactForm 
            ref="contactForm"
            :data="form"
            :onNext="onNext"
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <BuildingInfoForm 
            ref="buildingInfoForm"
            :data="form"
            :onNext="onNext"
            :onBack="onBack"
          />
        </v-stepper-content>

        <v-stepper-content step="3">
          <RentUnitForm 
            ref="rentUnitForm"
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
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import ContactForm from './Forms/ContactForm';
import BuildingInfoForm from './Forms/BuildingInfoForm';
import RentUnitForm from './Forms/RentUnitForm';
import {TOAST_SHOW_TIME, FAMILY_TYPE} from "@/constants";
export default {
  name: "RentInfoScreen",
  components: {
    ContactForm,
    BuildingInfoForm,
    RentUnitForm,
  },
  data () {
    return {
      step: 1,
      showResultDialog: false,
      form: {
        contactFirstName: '',
        contactLastName: '',
        contactPhone: '',
        contactEmail: '',
        contactAddress: '',
        contactCity: '',
        contactState: '',
        contactZip: '',
        type: FAMILY_TYPE.SINGLE,
        buildingAddress: '',
        buildingCity: '',
        buildingState: '',
        buildingZip: '',
        numberOfUnits: '',
        rentUnits: [],
      },
      // form: {
      //   contactFirstName: 'Nick',
      //   contactLastName: 'Gines',
      //   contactPhone: '158955875',
      //   contactEmail: 'nick@gmail.com',
      //   contactAddress: 'No. 21 East Road',
      //   contactCity: 'New York',
      //   contactState: 'New York',
      //   contactZip: '10025',
      //   type: FAMILY_TYPE.SINGLE,
      //   buildingAddress: 'No. 29 North',
      //   buildingCity: 'New York',
      //   buildingState: 'New York',
      //   buildingZip: '10025',
      //   numberOfUnits: 5,
      //   rentUnits: [
      //     {apartmentNumber: "Test 01", bedrooms: 2},
      //     {apartmentNumber: "Test 02", bedrooms: 4},
      //     {apartmentNumber: "Test 03", bedrooms: 5},
      //     {apartmentNumber: "Test 04", bedrooms: 1},
      //     {apartmentNumber: "Test 05", bedrooms: 2},
      //   ],
      // },
    }
  },

  methods: {
    ...mapActions([
      'submitForm',
    ]),

    onNext(step, data) {
      if (step === 1) {
        this.form.contactFirstName = data.contactFirstName;
        this.form.contactLastName = data.contactLastName;
        this.form.contactPhone = data.contactPhone;
        this.form.contactEmail = data.contactEmail;
        this.form.contactAddress = data.contactAddress;
        this.form.contactCity = data.contactCity;
        this.form.contactState = data.contactState;
        this.form.contactZip = data.contactZip;

        this.step = 2;
        this.$refs.buildingInfoForm.initPage();
      }
      else if (step === 2) {
        this.form.type = data.type;
        this.form.buildingAddress = data.buildingAddress;
        this.form.buildingCity = data.buildingCity;
        this.form.buildingState = data.buildingState;
        this.form.buildingZip = data.buildingZip;
        this.form.numberOfUnits = data.numberOfUnits;

        this.step = 3;
        this.$refs.rentUnitForm.initPage();
      }
      else if (step === 3) {
        this.form.rentUnits = data.rentUnits;
        this.onSubmit();
      }      
    },

    onBack() {
      this.step = this.step - 1;
    },

    onSubmit() {
      this.$loading(true);
      this.submitForm(this.form).then(data => {
        this.$loading(false);
        this.showResultDialog = true;
        this.resetForm();
      })
      .catch(error => {
        this.$loading(false);
        this.$toasted.error(error, {position: 'top-center', duration: TOAST_SHOW_TIME});
      });
    },

    resetForm() {
      this.step = 1;
      this.form = {
        contactFirstName: '',
        contactLastName: '',
        contactPhone: '',
        contactEmail: '',
        contactAddress: '',
        contactCity: '',
        contactState: '',
        contactZip: '',
        type: FAMILY_TYPE.SINGLE,
        buildingAddress: '',
        buildingCity: '',
        buildingState: '',
        buildingZip: '',
        numberOfUnits: '',
        rentUnits: [],
      };

      this.$refs.contactForm.resetPage();
      this.$refs.buildingInfoForm.resetPage();
      this.$refs.rentUnitForm.resetPage();

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
