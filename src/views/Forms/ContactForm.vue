<template>
    <div class="contact-form">
        <v-card class="mb-12 p-5">
            <div class="row justify-content-between mt-1">
                <v-text-field
                    class="col-md-6 col-sm-12"
                    label="First Name"
                    v-model="contactFirstName"
                    outlined
                    :rules="firstNameRules"
                />
                <v-text-field
                    class="col-md-6 col-sm-12"
                    label="Last Name"
                    v-model="contactLastName"
                    outlined
                    :rules="lastNameRules"
                />
            </div>
            
            <div class="row justify-content-between mt-4">
                <v-text-field
                    class="col-md-6 col-sm-12"
                    label="Email"
                    type="email"
                    v-model="contactEmail"
                    outlined
                    :rules="emailRules"
                />
                <v-text-field
                    class="col-md-6 col-sm-12"
                    label="Phone"
                    v-model="contactPhone"
                    outlined
                    :rules="phoneRules"
                />
            </div>

            <div class="row mt-4">
                <v-text-field
                    label="Address"
                    v-model="contactAddress"
                    outlined
                    :rules="addressRules"
                />
            </div>

            <div class="row justify-content-between mt-4">
                <v-text-field
                    class="col-md-4 col-sm-12"
                    label="City"
                    v-model="contactCity"
                    outlined
                    :rules="cityRules"
                />

                <v-select
                    class="col-md-4 col-sm-12"
                    :items="stateData"
                    v-model="contactState"
                    label="State"
                    outlined
                    :rules="stateRules"
                />

                <v-text-field
                    class="col-md-4 col-sm-12"
                    label="Zip Code"
                    v-model="contactZip"
                    outlined
                    :rules="zipRules"
                />
            </div>
            <div class="row justify-content-end">
                <v-btn
                    class="mt-3"
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
import {isValidEmail} from "@/helpers/functions";
import {STATE_NAMES} from '@/constants';

export default {
    name: "ContactForm",
    props: {
        data: Object,
        onNext: Function,
    },
    data () {
        return {
            disabledNext: true,
            stateData: STATE_NAMES,

            contactFirstName: this.data.contactFirstName,
            contactLastName: this.data.contactLastName,
            contactPhone: this.data.contactPhone,
            contactEmail: this.data.contactEmail,
            contactAddress: this.data.contactAddress,
            contactCity: this.data.contactCity,
            contactState: this.data.contactState,
            contactZip: this.data.contactZip,

            firstNameRules: [
                (value) => !!value || "Please input a valid first name.",
            ],
            lastNameRules: [
                (value) => !!value || "Please input a valid last name.",
            ],
            emailRules: [
                (value) => !!value || "Please input a valid email address.",
                (value) => isValidEmail((value || "")) || "Please input a valid email address.",
            ],
            phoneRules: [
                (value) => !!value || "Please input a valid contact phone.",
            ],
            addressRules: [
                (value) => !!value || "Please input a valid address.",
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
        }
    },

    mounted() {
        this.initPage();
    },

    methods: {
        initPage() {
            this.contactFirstName = this.data.contactFirstName;
            this.contactLastName = this.data.contactLastName;
            this.contactPhone = this.data.contactPhone;
            this.contactEmail = this.data.contactEmail;
            this.contactAddress = this.data.contactAddress;
            this.contactCity = this.data.contactCity;
            this.contactState = this.data.contactState;
            this.contactZip = this.data.contactZip;

            this.checkValid();
        },

        resetPage() {
            this.contactFirstName = '';
            this.contactLastName = '';
            this.contactPhone = '';
            this.contactEmail = '';
            this.contactAddress = '';
            this.contactCity = '';
            this.contactState = '';
            this.contactZip = '';
        },

        onNextForm() {
            if (this.onNext) {
                this.onNext(1, {
                    contactFirstName: this.contactFirstName,
                    contactLastName: this.contactLastName,
                    contactPhone: this.contactPhone,
                    contactEmail: this.contactEmail,
                    contactAddress: this.contactAddress,
                    contactCity: this.contactCity,
                    contactState: this.contactState,
                    contactZip: this.contactZip,
                });
            }
        },

        checkValid() {
            let valid = true;

            // Check First Name
            if (!(this.contactFirstName && this.contactFirstName.length > 0)) {
                valid = false;
            }

            // Check Last Name
            if (!(this.contactLastName && this.contactLastName.length > 0)) {
                valid = false;
            }

            // Check Email.
            if (!(this.contactEmail && this.contactEmail.length > 0 && isValidEmail(this.contactEmail))) {
                valid = false;
            }

            // Check Phone.
            if (!(this.contactPhone && this.contactPhone.length > 0)) {
                valid = false;
            }

            // Check Address.
            if (!(this.contactAddress && this.contactAddress.length > 0)) {
                valid = false;
            }

            // Check City.
            if (!(this.contactCity && this.contactCity.length > 0)) {
                valid = false;
            }

            // Check State.
            if (!(this.contactState && this.contactState.length > 0)) {
                valid = false;
            }

            // Check Zip.
            if (!(this.contactZip && this.contactZip.length > 0)) {
                valid = false;
            }

            this.disabledNext = !valid;
        },
    },

    watch: {
        contactFirstName: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactLastName: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactPhone: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactEmail: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactAddress: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactCity: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactState: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },

        contactZip: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.checkValid();
            }
        },
    }
}
</script>
<style lang="scss" scoped>

</style>