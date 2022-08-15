<template>
  <div class="main-page">
    <AppBar />
    <v-data-table
      :headers="headers"
      :items="allContacts"
      :search="search"
      sort-by="contactFirstName"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          Forms
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />

          <v-dialog v-model="dialog" max-width="640px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <p class="section-title">Property Owner</p>
                  <v-divider />
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="First Name"
                        v-model="selectedContact.contactFirstName"
                        outlined
                        :rules="firstNameRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Last Name"
                        v-model="selectedContact.contactLastName"
                        outlined
                        :rules="lastNameRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Email"
                        type="email"
                        v-model="selectedContact.contactEmail"
                        outlined
                        :rules="emailRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Phone"
                        v-model="selectedContact.contactPhone"
                        outlined
                        :rules="phoneRules"
                      />
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Address"
                        v-model="selectedContact.contactAddress"
                        outlined
                        :rules="addressRules"
                      />
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="City"
                        v-model="selectedContact.contactCity"
                        outlined
                        :rules="cityRules"
                      />
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="stateData"
                        v-model="selectedContact.contactState"
                        label="State"
                        outlined
                        :rules="stateRules"
                      />
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Zip Code"
                        v-model="selectedContact.contactZip"
                        outlined
                        :rules="zipRules"
                      />
                    </v-col>
                  </v-row>

                  <p class="section-title">Rental Property Building Info</p>
                  <v-divider />
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-radio-group v-model="selectedContact.type" row>
                        <v-radio label="Single Family" :value="SINGLE" />
                        <v-radio
                          class="multi-radio"
                          label="Multi Family"
                          :value="MULTI"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        label="Street Address"
                        placeholder="Street Address"
                        v-model="selectedContact.buildingAddress"
                        outlined
                        :rules="streetAddressRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="City"
                        v-model="selectedContact.buildingCity"
                        :rules="cityRules"
                        outlined
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        :items="stateData"
                        v-model="selectedContact.buildingState"
                        label="State"
                        outlined
                        :rules="stateRules"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        label="Zip Code"
                        v-model="selectedContact.buildingZip"
                        :rules="zipRules"
                        outlined
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      v-if="selectedContact.type === MULTI"
                    >
                      <v-text-field
                        label="Number of Units"
                        placeholder="Number of Units"
                        v-model="selectedContact.numberOfUnits"
                        type="number"
                        :rules="numberOfUnitsRules"
                        @input="changeUnits"
                        outlined
                      />
                    </v-col>
                  </v-row>

                  <div v-if="selectedContact.type === MULTI">
                    <p class="section-title">Rent Units</p>
                    <v-divider />
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-row
                          v-for="(unit, index) in selectedContact.rentUnits"
                          :key="index"
                        >
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :label="'Apartment Number #' + (index + 1)"
                              placeholder="Apartment Number"
                              v-model="unit.apartmentNumber"
                              :rules="apartmentNumberRules"
                              outlined
                              @change="checkValid"
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              type="number"
                              :label="'Bedrooms #' + (index + 1)"
                              placeholder="Bedrooms"
                              v-model="unit.bedrooms"
                              :rules="bedroomsRules"
                              outlined
                              @change="checkValid"
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="unitDialog" max-width="640px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Rent Units</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <div v-if="selectedContact.type === MULTI">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-row
                          v-for="(unit, index) in selectedContact.rentUnits"
                          :key="index"
                        >
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :label="'Apartment Number #' + (index + 1)"
                              v-model="unit.apartmentNumber"
                              :rules="apartmentNumberRules"
                              outlined
                              readonly
                            />
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              type="number"
                              :label="'Bedrooms #' + (index + 1)"
                              v-model="unit.bedrooms"
                              :rules="bedroomsRules"
                              outlined
                              readonly
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeUnit">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="530px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this contact?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.numberOfUnits`]="{ item }">
        <v-icon
          small
          class="mr-2"
          v-if="item.numberOfUnits > 0"
          @click="showUnits(item)"
          >mdi-domain</v-icon
        >
        {{ item.numberOfUnits }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          color="primary darken-2"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil</v-icon
        >
        <v-icon small color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getContacts"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppBar from "@/components/AppBar";
import { isValidEmail } from "@/helpers/functions";
import { STATE_NAMES, FAMILY_TYPE } from "@/constants";

export default {
  components: {
    AppBar,
  },
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    unitDialog: false,
    headers: [
      { text: "Contact First Name", value: "contactFirstName" },
      { text: "Contact Last Name", value: "contactLastName" },
      { text: "Contact Phone", value: "contactPhone" },
      { text: "Contact Email", value: "contactEmail" },
      { text: "Contact Address", value: "contactAddress" },
      { text: "Contact City", value: "contactCity" },
      { text: "Contact State", value: "contactState" },
      { text: "Contact Zipcode", value: "contactZip" },
      { text: "Building Adress", value: "buildingAddress" },
      { text: "Building City", value: "buildingCity" },
      { text: "Building State", value: "buildingState" },
      { text: "Building Zipcode", value: "buildingZip" },
      { text: "Number of Units", value: "numberOfUnits" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    selectedContact: {},
    selectedIndex: -1,
    defaultContact: {},

    //Contact Form
    stateData: STATE_NAMES,
    SINGLE: FAMILY_TYPE.SINGLE,
    MULTI: FAMILY_TYPE.MULTI,
    rentUnits: [],

    firstNameRules: [(value) => !!value || "Please input a valid first name."],
    lastNameRules: [(value) => !!value || "Please input a valid last name."],
    emailRules: [
      (value) => !!value || "Please input a valid email address.",
      (value) =>
        isValidEmail(value || "") || "Please input a valid email address.",
    ],
    phoneRules: [(value) => !!value || "Please input a valid contact phone."],
    addressRules: [(value) => !!value || "Please input a valid address."],
    cityRules: [(value) => !!value || "Please input a valid city."],
    stateRules: [(value) => !!value || "Please input a valid state."],
    zipRules: [(value) => !!value || "Please input a valid zip code."],
    streetAddressRules: [
      (value) => !!value || "Please input a valid street address.",
    ],
    numberOfUnitsRules: [
      (value) => !!value || "Please input a valid number of units.",
    ],
    apartmentNumberRules: [
      (value) => !!value || "Please input a valid apartment number.",
    ],
    bedroomsRules: [(value) => !!value || "Please input a valid bedrooms."],
  }),

  computed: {
    ...mapGetters(["allContacts"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Contact" : "Edit Contact";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getContacts();
  },

  methods: {
    ...mapActions(["getContacts", "deleteContact", "updateContact"]),

    //Delete Contact
    deleteItem(item) {
      this.selectedContact = Object.assign({}, item);
      this.selectedIndex = this.allContacts.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteContact(this.selectedContact._id);
      this.allContacts.splice(this.selectedIndex, 1);
      this.closeDelete();
    },

    //Edit contact
    editItem(item) {
      this.selectedIndex = this.allContacts.indexOf(item);
      this.selectedContact = Object.assign({}, item);
      this.rentUnits = this.selectedContact.rentUnits;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        Object.assign(this.selectedContact, this.defaultContact);
        this.selectedIndex = -1;
        this.rentUnits = [];
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        Object.assign(this.selectedContact, this.defaultContact);
      });
    },

    save() {
      if (this.selectedIndex > -1) {
        //Update contact
        this.updateContact(this.selectedContact);
        Object.assign(
          this.allContacts[this.selectedIndex],
          this.selectedContact
        );
      } else {
        //Add contact
        this.allContacts.push(this.selectedContact);
      }
      this.close();
    },

    checkValid() {
      let valid = true;
      if (this.type === FAMILY_TYPE.MULTI) {
        this.rentUnits.forEach((unit) => {
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

    changeUnits() {
      this.selectedContact.numberOfUnits;
      let numberOfUnits = this.selectedContact.numberOfUnits;
      if (numberOfUnits > 0) {
        if (this.selectedContact.rentUnits.length > numberOfUnits) {
          let dif = numberOfUnits - this.selectedContact.rentUnits.length;
          this.selectedContact.rentUnits.splice(dif);
        } else {
          let dif = numberOfUnits - this.selectedContact.rentUnits.length;
          for (let i = 0; i < dif; i++) {
            this.selectedContact.rentUnits.push({
              apartmentNumber: "",
              bedrooms: "",
            });
          }
        }
      }
    },

    //show apartments & bednum
    showUnits(item) {
      this.selectedIndex = this.allContacts.indexOf(item);
      this.selectedContact = Object.assign({}, item);
      this.rentUnits = this.selectedContact.rentUnits;
      this.unitDialog = true;
    },
    closeUnit() {
      this.unitDialog = false;
      this.$nextTick(() => {
        Object.assign(this.selectedContact, this.defaultContact);
        this.selectedIndex = -1;
        this.rentUnits = [];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.section-title {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 600;
}
</style>
