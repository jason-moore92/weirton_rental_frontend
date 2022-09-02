<template>
  <div class="main-page p-4">
    <v-card class="p-4 dashboard-panel">
      <div class="label mb-3">Dashboard</div>
      <!-- style="overflow-y: auto; height: calc(100% - 50px)" -->
      <div v-if="!isLoading" mt-4 >
        <div class="header mb-3">All Households Memebers: {{ allHouseholdMembers.length }}</div>
        <div class="table-panel" >
          <table class="with-header">
            <tbody>
              <tr
              v-for="(row, x) in householdMemberTableData"
              :key="x"
              :class="{header: x === 0}">
              <template v-for="(col, y) in row">
                <td
                  :key="y"
                  :data-th="householdMemberTableData[0][y].value">
                  {{ col.value }}
                </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="header mt-7 mb-3">All Homes: {{ allHomes.length }}</div>
        <div class="table-panel" >
          <table class="with-header">
            <tbody>
              <tr
              v-for="(row, x) in homeTableData"
              :key="x"
              :class="{header: x === 0}">
              <template v-for="(col, y) in row">
                <td
                  :key="y"
                  :data-th="homeTableData[0][y].value">
                  {{ col.value }}
                </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </v-card>

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

const householdApi = new HouseholdApi();


export default {
  name: "DashboardScreen",
  components: {
    Loading,
  },
  data () {
    return {
      isLoading: true,
      isHomesLoading: true,
      isHousehholdsLoading: true,
      allHomes: [],
      allHouseholdMembers: [],
      homeTableData:[],
      householdMemberTableData:[],
    }
  },
  mounted() {
    if(this.$store.state.household.allHomes.length > 0) {
      this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
      this.isHomesLoading = false;
      this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
      console.log("this.allHomes", this.allHomes)
      console.log("this.isHomesLoading", this.isHomesLoading)
      this.onConvertHomesToTableData()
    }else{
      this.isHomesLoading = true;
      this.getAllHomes().then((result)=> {
        this.allHomes = _.cloneDeep(this.$store.state.household.allHomes)
        this.isHomesLoading = false;
        this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
        console.log("this.allHomes", this.allHomes)
        console.log("this.isHomesLoading", this.isHomesLoading)
        this.onConvertHomesToTableData()
      }).catch((err)=>{
        console.log(err);
        this.isHomesLoading = false;
        this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
      })
    }

    if(this.$store.state.household.allHouseholdMembers.length > 0) {
      this.allHouseholdMembers = _.cloneDeep(this.$store.state.household.allHouseholdMembers)
      this.isHousehholdsLoading = false;
      this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
      console.log("this.allHouseholdMembers", this.allHouseholdMembers)
      console.log("this.isHousehholdsLoading", this.isHousehholdsLoading)
      this.onConvertHouseholdMembersToTableData()
    }else{
      this.isHousehholdsLoading = true;
      this.getAllHouseholdMembers().then((result)=> {
        this.allHouseholdMembers = _.cloneDeep(this.$store.state.household.allHouseholdMembers)
        this.isHousehholdsLoading = false;
        this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
        console.log("this.allHouseholdMembers", this.allHouseholdMembers)
        console.log("this.isHousehholdsLoading", this.isHousehholdsLoading)
        this.onConvertHouseholdMembersToTableData()
      }).catch((err)=>{
        console.log(err);
        this.isHousehholdsLoading = false;
        this.isLoading = this.isHomesLoading || this.isHousehholdsLoading
      })
    }
  },
  methods: {
    ...mapActions([
      'getAllHomes',
      'getAllHouseholdMembers',
    ]),
    onConvertHomesToTableData(){
      let homeTableData = [
        [
          { value: 'Address' }, 
          { value: 'City' }, 
          { value: 'State' }, 
          { value: 'Country' },
          { value: 'Zipcode' },
          { value: 'MSA' },
          { value: 'TractCode' },
        ],
        
      ]
      for (let index = 0; index < this.allHomes.length; index++) {
        const home = this.allHomes[index];
        homeTableData.push([
          { value: home.address }, 
          { value: home.city }, 
          { value: home.state }, 
          { value: home.country },
          { value: home.zipcode },
          { value: home.msa },
          { value: home.tractCode },
        ])
      }
      this.homeTableData = homeTableData
    },
    onConvertHouseholdMembersToTableData(){
      let householdMemberTableData = [
        [
          { value: 'First Name' }, 
          { value: 'Last Name' }, 
          { value: 'BirthDay' }, 
          { value: 'Gender' },
          { value: 'Type' },
          { value: 'Is a student' },
        ],
        
      ]
      for (let index = 0; index < this.allHouseholdMembers.length; index++) {
        const member = this.allHouseholdMembers[index];
        householdMemberTableData.push([
          { value: member.firstName }, 
          { value: member.lastName }, 
          { value: member.birthday }, 
          { value: member.gender },
          { value: member.type },
          { value: member.isStudent? 'Yes' : 'No' },
        ])
      }
      
      this.householdMemberTableData = householdMemberTableData
    },
  },
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';
  $breakpoint: 480px;


  .main-page{
    min-height: calc(100vh - $appbarHeight);
    height: 100%;
    overflow-y: auto;
    background-color: $mainPageBack;
  }

  .dashboard-panel{
    min-height: calc(100vh - $appbarHeight - 50px);
    .label{ 
      font-size: 20px;
    }

    .header{ 
      font-size: 16px;
    }
  }

  .table-panel{
    background-color: #FFF;

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
          text-align: center;
        }

        // td:last-child {
        //   width: 50px;
        //   .action {
        //     text-align: center;
        //     width: 50px;
        //     .icon{
        //       cursor: pointer;
        //       padding: 0px 5px;
        //     }
        //   }
        // }
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
            text-align: left;
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
  
</style>
