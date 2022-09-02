<template>
  <div class="main-page">
    <div class="table-panel">
      <div class="d-flex justify-content-end" style="width: 100%">
        <v-btn
          class="add-button"
          color="primary"
          small
          @click="onOpenNewDialog"
          >
          Add Home
        </v-btn>
      </div>
      <div style="overflow-y: auto; height: calc(100% - 50px)">
        <table class="with-header">
          <tbody>
            <tr
            v-for="(row, x) in tableData"
            :key="x"
            :class="{header: x === 0}">
            <template v-for="(col, y) in row">
              <td
                v-if="col.value != 'action'"
                :key="y"
                :data-th="tableData[0][y].value">
                {{ col.value }}
              </td>
              <td
                class="action-td text-center"
                v-else-if="col.value == 'action' && x == 0"
                :key="y"
                style="height: 0px !important ;"
                >
                <!-- <div class="action">
                  <font-awesome-icon 
                    icon="fa-solid fa-circle-plus"  
                    class="icon" style="color: #FFFFFF"
                    @click="onOpenNewDialog()"/>
                </div> -->
              </td>
              <td
                class="action-td text-center"
                v-else
                :key="y">
                <div class="action"> 
                  <font-awesome-icon 
                    icon="fa-solid fa-pen-to-square"  
                    class="icon" style="color: #17BB43" 
                    @click="onOpenEditDialog(col.data)"/>

                  <font-awesome-icon 
                    icon="fa-solid fa-trash-can" 
                    class="icon" style="color: #F00"
                    @click="onOpenDeleteDialog(col.data)"/>
                </div>
              </td>
            </template>
            
          </tr>
          </tbody>
        </table>
      </div>
    </div>

      <HomeAddressForm 
        v-if="showEditDialog"
        :isNewHome="false"
        :title="'Edit Home Address'"
        :homeData="selectedHome"
        @closeDialog="showEditDialog = false"
        @onDone="onUpdateHome"
      />

      <HomeAddressForm 
        v-if="showNewDialog"
        :isNewHome="true"
        :title="'New Home Address'"
        @closeDialog="showNewDialog = false"
        @onDone="onNewHome"
      />

      <v-dialog
        v-model="showDeleteDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Delete Home Address
          </v-card-title>
  
          <v-card-text>
            Do you want to delete this home address?
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="onDeleteHome"
            >
              Yes
            </v-btn>
  
            <v-btn
              color="blac darken-1"
              text
              @click="showDeleteDialog = false"
            >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- <v-dialog
      v-model="showEditDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <HomeAddressForm 
        @closeDialog="showEditDialog = false"
      />
    </v-dialog> -->

    <Loading
      v-if="isLoading"
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
import _ from "lodash";
import {mapActions} from 'vuex'

import { HouseholdApi } from '@/apis/household-api'
import {STATE_NAMES} from '@/constants';
import HomeAddressForm from "@/components/new_household/HomeAddressForm.vue";

const householdApi = new HouseholdApi();

export default {
  name: "HomesScreen",
  components: {
    Loading,
    HomeAddressForm,
  },
  data () {
    return {
      isLoading: false,
      showEditDialog: false,
      showNewDialog: false,
      showDeleteDialog: false,
      tableData: [
        [
          { value: 'Address' }, 
          { value: 'City' }, 
          { value: 'State' }, 
          { value: 'Country' },
          { value: 'Zipcode' },
          { value: 'MSA' },
          { value: 'TractCode' },
          { value: 'action' },
        ],
      ],
      allHomes: [],
      selectedHome: {},
      disabledUpdate: true,
      disabledNew: true,
      stateData: STATE_NAMES,
      countryRules: [
        (value) => !!value || "Please input country.",
      ],
      msaRules: [
        (value) => !!value || "Please input msa.",
      ],
      tractCodeRules: [
        (value) => !!value || "Please input tract code.",
      ],
      addressRules: [
          (value) => !!value || "Please input address.",
      ],
      cityRules: [
          (value) => !!value || "Please input city.",
      ],
      stateRules: [
          (value) => !!value || "Please input state.",
      ],
      zipRules: [
          (value) => !!value || "Please input zip code.",
      ],
    }
  },
  mounted() {
    if(this.$store.state.household.allHomes.length > 0) {
      this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
      this.onConvertHomesToTableData()
      this.isLoading = false;
    }else{
      this.isLoading = true;
      this.getAllHomes().then((result)=> {
        this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
        this.onConvertHomesToTableData()
        this.isLoading = false;
      }).catch((err)=>{
        console.log(err);
        this.isLoading = false;
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllHomes',
    ]),
    onConvertHomesToTableData(){
      let tableData = [
        [
          { value: 'Address' }, 
          { value: 'City' }, 
          { value: 'State' }, 
          { value: 'Country' },
          { value: 'Zipcode' },
          { value: 'MSA' },
          { value: 'TractCode' },
          { value: 'action' },
        ],
        
      ]
      for (let index = 0; index < this.allHomes.length; index++) {
        const home = this.allHomes[index];
        tableData.push([
          { value: home.address }, 
          { value: home.city }, 
          { value: home.state }, 
          { value: home.country },
          { value: home.zipcode },
          { value: home.msa },
          { value: home.tractCode },
          { value: 'action' , data: home },
        ])
      }
      this.tableData = tableData
    },
    onOpenEditDialog(home){
      this.selectedHome = home
      this.showEditDialog = true
    },
    onOpenNewDialog(){
      this.selectedHome = {}
      this.showNewDialog = true
    },
    onOpenDeleteDialog(home){
      this.selectedHome = home
      this.showDeleteDialog = true
    },
    onNewHome(newHome){
      householdApi.addHome(newHome).then((result)=>{
        result = {
          ...result,
          "text": result.address,
          "value": result['_id'],
        }
        console.log("addHome", result)
        let allHomes = _.cloneDeep(this.allHomes)
        allHomes.push({
          ...result,
          "text": result.address,
          "value": result['_id'],
        })

        allHomes.sort((a, b)=>{
          let fa = a.address.toLowerCase(), fb = b.address.toLowerCase();
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })

        this.allHomes = allHomes
        this.$store.commit("setAllHomes", allHomes);
        this.onConvertHomesToTableData()
      })
    },
    onUpdateHome(newHome){
      householdApi.updateHome(newHome).then((result)=>{
        let allHomes = _.cloneDeep(this.allHomes)
        let index = allHomes.findIndex((home)=> home['_id'] == result['_id'])
        if(index >= 0){
          allHomes[index] = {
            ...result,
            "text": result.address,
            "value": result['_id'],
          };
        }else{
          allHomes.push({
            ...result,
            "text": result.address,
            "value": result['_id'],
          })
        }

        allHomes.sort((a, b)=>{
          let fa = a.address.toLowerCase(), fb = b.address.toLowerCase();
          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })

        this.allHomes = allHomes
        this.$store.commit("setAllHomes", allHomes);
        this.onConvertHomesToTableData()
      })
    },
    onDeleteHome(){
      this.showDeleteDialog = false
      let allHomes = _.cloneDeep(this.allHomes)
      let index = allHomes.findIndex((home)=> home['_id'] == this.selectedHome['_id'])
      if(index >= 0){
        allHomes.splice(index, 1)
      }
      householdApi.deleteHome(this.selectedHome).then((result)=>{
      })
      this.allHomes = allHomes
      this.selectedHome = {}
      this.$store.commit("setAllHomes", allHomes);
      this.onConvertHomesToTableData()
    }
  },
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';
  $breakpoint: 480px;

  .add-button{
    // display: none;
    // padding: 0px;
    // margin: 0px;
    display: flex;
    padding: 0px;
    margin-bottom: 10px;
    height: 40px !important;
  }

  .main-page{
    padding: 15px;
    height: 100%;
  }
  
  .table-panel{
    background-color: #FFF;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 15px;

    //////  table styles ////////
    table{
      padding: 15px !important;
      // min-width: 300px;
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #c2c2c2;
      font-size: 16px;

      tr {
        td {
          border: 1px solid #c2c2c2;
          padding: 5px;
        }

        td:last-child {
          width: 50px;
          .action {
            text-align: center;
            width: 50px;
            .icon{
              cursor: pointer;
              padding: 0px 5px;
            }
          }
        }
      }
      .header {
        border-right: none;
        border-left: none;
        background: #ddd;
        border-bottom: 1px solid #c2c2c2;
        border: none;
        td {
          border: none;
          background: #1CB5B1;
          color: #fff;
          border: none;
          font-size: 16px;
          font-weight: bold;
        }
      }

      
    }

    .with-header {
      tr:first-of-type {
        td {
          border-bottom: 1px solid #1CB5B1 !important;
        }
      }
      @media (max-width: $breakpoint) {
        tr:first-of-type {
          display: none;
        }
        tr {
          border: 1px solid #000;
          td {
            display: block;
            border: none;
            &:first-child {
              padding-top: .5em;
            }
            &:last-child {
              padding-bottom: .5em;
            }
          }
          td:not(.action-td)::before {
            content: attr(data-th)":";
            font-weight: bold;
            display: inline-block;
            @media (min-width: $breakpoint) {
              display: none;
            }
          }

          .action-td {
            width: 80px;
            .action {
              text-align: center;
              width: 80px;
              .icon{
                cursor: pointer;
                padding: 0px 5px;
                height: 25px;
              }
            }
          }
        }
      }
    }
    ////// -------- table styles ------ ////////
  }

  @media (max-width: $breakpoint) {
    .add-button{
      display: flex;
      padding: 0px;
      margin-bottom: 10px;
      height: 40px !important;
    }

    .action-td {
      width: 100% !important;
      display: flex !important;
      justify-content: flex-end;
      
      .action {
        text-align: center;
        width: 80px;
        .icon{
          cursor: pointer;
          padding: 0px 5px;
          height: 25px;
        }
      }
    }
  }
</style>
