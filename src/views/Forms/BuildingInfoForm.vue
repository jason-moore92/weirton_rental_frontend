<template>
    <div class="building-info-form">
        <v-card class="mb-12 p-5">
            <div class="row">
                <v-radio-group v-model="type" row>
                    <v-radio
                        label="Single Family"
                        :value="SINGLE"
                    />
                    <v-radio
                        class="multi-radio"
                        label="Multi Family"
                        :value="MULTI"
                    ></v-radio>
                </v-radio-group>
            </div>
            <div class="row mt-5">
                <v-text-field
                  label="Street Address"
                  placeholder="Street Address"
                  v-model="buildingAddress"
                  outlined
                  :rules="streetAddressRules"
                />
            </div>
            <div class="row justify-content-between mt-4">
                <v-text-field
                  class="col-md-4 col-sm-12"
                  label="City"
                  v-model="buildingCity"
                  :rules="cityRules"
                  outlined
                />

                <v-select
                    class="col-md-4 col-sm-12"
                    :items="stateData"
                    v-model="buildingState"
                    label="State"
                    outlined
                    :rules="stateRules"
                />

                <v-text-field
                  class="col-md-4 col-sm-12"
                  label="Zip Code"
                  v-model="buildingZip"
                  :rules="zipRules"
                  outlined
                />
            </div>
            <div class="row" v-if="type === MULTI" mt-4>
                <v-text-field
                  label="Number of Units"
                  placeholder="Number of Units"
                  v-model="numberOfUnits"
                  type="number"
                  :rules="numberOfUnitsRules"
                  outlined
                />
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
import { FAMILY_TYPE, STATE_NAMES } from '@/constants';
export default {
    name: "BuildingInfoForm",
    props: {
        data: Object,
        onNext: Function,
        onBack: Function,
    },
    data () {
        return {
            disabledNext: true,
            stateData: STATE_NAMES,

            SINGLE: FAMILY_TYPE.SINGLE,
            MULTI: FAMILY_TYPE.MULTI,

            type: FAMILY_TYPE.SINGLE,
            buildingAddress: '',
            buildingCity: '',
            buildingState: '',
            buildingZip: '',
            numberOfUnits: 0,

            streetAddressRules: [
                (value) => !!value || "Please input a valid street address.",
            ],
            cityRules: [
                (value) => !!value || "Please input a valid city.",
            ],
            stateRules: [
                (value) => !!value || "Please input a valid state.",
            ],
            zipRules: [
                (value) => !!value || "Please input a valid zip code.",
            ],
            numberOfUnitsRules: [
                (value) => !!value || "Please input a valid number of units.",
            ],
        }
    },

    methods: {
        initPage() {
            this.type = this.data.type;
            this.buildingAddress = this.data.buildingAddress;
            this.buildingCity = this.data.buildingCity;
            this.buildingState = this.data.buildingState;
            this.buildingZip = this.data.buildingZip;
            this.numberOfUnits = this.data.numberOfUnits;

            this.checkValid();
        },

        resetPage() {
            this.type = FAMILY_TYPE.SINGLE;
            this.buildingAddress = '';
            this.buildingCity = '';
            this.buildingState = '';
            this.buildingZip = '';
            this.numberOfUnits = '';
        },

        onNextForm() {
            if (this.onNext) {
                this.onNext(2, {
                    type: this.type,
                    buildingAddress: this.buildingAddress,
                    buildingCity: this.buildingCity,
                    buildingState: this.buildingState,
                    buildingZip: this.buildingZip,
                    numberOfUnits: this.numberOfUnits,
                });
            }
        },

        checkValid() {
            let valid = true;

            // Check Type
            if (!(this.type && this.type.length > 0)) {
                valid = false;
            }

            // Check Street Address
            if (!(this.buildingAddress && this.buildingAddress.length > 0)) {
                valid = false;
            }

            // Check City.
            if (!(this.buildingCity && this.buildingCity.length > 0)) {
                valid = false;
            }

            // Check State.
            if (!(this.buildingState && this.buildingState.length > 0)) {
                valid = false;
            }

            // Check Zip.
            if (!(this.buildingZip && this.buildingZip.length > 0)) {
                valid = false;
            }

            // Check Number of Units.
            if (this.type === FAMILY_TYPE.MULTI && this.numberOfUnits < 0) {
                valid = false;
            }

            this.disabledNext = !valid;
        },
    },

    watch: {
        type: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        buildingAddress: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        buildingCity: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        buildingState: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        buildingZip: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        numberOfUnits: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },
    }
}
</script>
<style lang="scss">
.building-info-form {
    .v-input--selection-controls .v-input__slot>.v-label, .v-input--selection-controls .v-radio>.v-label {
        margin-bottom: 0;
    }

    .multi-radio {
        margin-left: 10px;
    }

    @media only screen and (max-width: 768px) {
      .multi-radio  {
          margin-left: 0px;
          margin-top: 15px;
      }
    }
}
</style>
