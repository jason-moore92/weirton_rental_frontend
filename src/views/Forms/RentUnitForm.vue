<template>
    <div class="rent-unit-form">
        <v-card class="mb-12 p-5">
            <div v-if="type === SINGLE">
                <div class="row">
                    <v-text-field
                    label="Street Address"
                    placeholder="Street Address"
                    v-model="buildingAddress"
                    outlined
                    readonly
                    />
                </div>
                <div class="row justify-content-between mt-4">
                    <v-text-field
                        class="col-md-4 col-sm-12"
                        label="City"
                        v-model="buildingCity"
                        outlined
                        readonly
                    />

                    <v-select
                        class="col-md-4 col-sm-12"
                        :items="stateData"
                        v-model="buildingState"
                        label="State"
                        outlined
                        readonly
                    />

                    <v-text-field
                        class="col-md-4 col-sm-12"
                        label="Zip Code"
                        v-model="buildingZip"
                        readonly
                        outlined
                    />
                </div>
            </div>
            <div 
                v-if="type === MULTI" mt-4
            >
                <div class="row justify-content-between"  v-for="(unit, index) in rentUnits" :key="index">
                    <v-text-field
                        class="col-md-6 col-sm-12"
                        :label="'Apartment Number #' + (index + 1)"
                        placeholder="Apartment Number"
                        v-model="unit.apartmentNumber"
                        :rules="apartmentNumberRules"
                        outlined
                        @change="checkValid"
                    />
                    <v-text-field
                        class="col-md-6 col-sm-12"
                        type="number"
                        :label="'Bedrooms #' + (index + 1)"
                        placeholder="Bedrooms"
                        v-model="unit.bedrooms"
                        :rules="bedroomsRules"
                        outlined
                        @change="checkValid"
                    />
                </div>
            </div>

            <div class="row justify-space-between align-center mt-3">
                <div class="row justify-content-end button-box">
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
            </div>
        </v-card>
    </div>
</template>

<script>
import { RECAPTCHA_KEY, FAMILY_TYPE, STATE_NAMES } from '@/constants';
export default {
    name: "RentUnitForm",
    props: {
        data: Object,
        onNext: Function,
        onBack: Function,
    },
    components: {
    },
    data () {
        return {
            disabledNext: true,
            isVerifyRecaptch: false,
            stateData: STATE_NAMES,

            recaptchaKey: RECAPTCHA_KEY,
            
            SINGLE: FAMILY_TYPE.SINGLE,
            MULTI: FAMILY_TYPE.MULTI,

            type: '',
            buildingAddress: '',
            buildingCity: '',
            buildingState: '',
            buildingZip: '',
            rentUnits: [],
            apartmentNumberRules: [
                (value) => !!value || "Please input a valid apartment number.",
            ],
            bedroomsRules: [
                (value) => !!value || "Please input a valid bedrooms.",
            ],
        }
    },

    mounted() {
        this.initPage();
    },

    methods: {
        initPage() {
            this.type = this.data.type;
            this.buildingAddress = this.data.buildingAddress;
            this.buildingCity = this.data.buildingCity;
            this.buildingState = this.data.buildingState;
            this.buildingZip = this.data.buildingZip;
            this.numberOfUnits = this.data.numberOfUnits;
            this.rentUnits = this.data.rentUnits;

            let list = [];
            for (let i = 0; i < this.numberOfUnits; i++) {
                let apartmentNumber = '';
                let bedrooms = '';

                if (i < this.rentUnits.length) {
                    apartmentNumber = this.rentUnits[i].apartmentNumber;
                    bedrooms = this.rentUnits[i].bedrooms;
                }

                list.push({
                    apartmentNumber,
                    bedrooms,
                });
            }

            this.rentUnits = list;
            this.checkValid();
        },

        resetPage() {
            this.buildingAddress = '';
            this.buildingCity = '';
            this.buildingState = '';
            this.buildingZip = '';
            this.numberOfUnits = 0;
            this.rentUnits = [];
        },

        onNextForm() {
            if (this.onNext) {
                this.onNext(3, {
                    rentUnits: this.rentUnits,
                });
            }
        },

        checkValid() {
            let valid = true;
            if (this.type === FAMILY_TYPE.MULTI) {

                this.rentUnits.forEach(unit => {
                    // Check Apartment Rooms
                    if (!(unit.apartmentNumber && unit.apartmentNumber.length > 0)) {
                        valid = false;
                        return;
                    }

                    // Check Bedroom
                    if (!(unit.bedrooms && unit.bedrooms.length > 0)) {
                        valid = false;
                        return;
                    }
                });
            }
            
            if (!this.isVerifyRecaptch) valid = false;
            this.disabledNext = !valid;
        },

        verifyMethod() {
            this.isVerifyRecaptch = true;
        },

        expiredMethod() {
            this.isVerifyRecaptch = false;
        },

        renderMethod() {
            
        },

        errorMethod() {
            console.log('recaptcha error ==>');
        }
    },

    watch: {
        isVerifyRecaptch: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
    .button-box  {
        margin-top: 20px;
    }
}
</style>