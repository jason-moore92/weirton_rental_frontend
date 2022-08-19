<template>
  <div class="contact-form">
    <v-card class="mb-12 p-5">
      <div v-for="(member, index) in members" :key="index" class="member-info row justify-content-between">
        <div class="col-md-4 col-sm-2 col-12">
          {{member.firstName}} {{member.lastName}}
        </div>
        <v-select
          class="col-md-4 col-sm-4 col-12"
          :items="incomeTypes"
          v-model="member.incomeType"
          label="Income Type"
          outlined
          :rules="incomeTypeRules"
          @input="checkValid"
        />

        <v-text-field
          class="col-md-4 col-sm-4 col-12"
          label="Annual Amount"
          v-model="member.annualAmount"
          outlined
          type="number"
          :rules="incomeAmountRules"
          @input="checkValid"
        />
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
            Next
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import _ from "lodash";

import {isValidEmail} from "@/helpers/functions";
import {Income_TYPES} from '@/constants';

export default {
    name: "IncomeForm",
    props: {
      data: Object,
      onNext: Function,
      onBack: Function,
    },
    data () {
      return {
        disabledNext: true,
        incomeTypes: Income_TYPES,
        members: _.cloneDeep(this.data.members),
        incomeTypeRules: [
            (value) => !!value || "Please select income type.",
        ],
        incomeAmountRules: [
            (value) => !!value || "Please input income amount.",
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
        this.members = _.cloneDeep(this.data.members);
        this.checkValid();
      },
      resetPage() {
      },
      onNextForm() {
        if (this.onNext) {
          this.onNext(4, {
            members: this.members,
          });
        }
      },
      checkValid() {
        let valid = true;

        for (const member of this.members) {
          // Check incomeType
          if (!(member.incomeType && member.incomeType.length > 0)) {
              valid = false;
              break;
          }

          // Check annualAmount
          if (!(member.annualAmount && member.annualAmount.length > 0)) {
              valid = false;
              break;
          }
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