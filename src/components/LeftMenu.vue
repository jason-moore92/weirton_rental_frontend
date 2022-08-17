<template>
  <div class="menu-bar">
    <div 
      class="menu-item" 
      :class="$route.path === item.path ? 'selected':''"
      v-for="(item) in leftMenuOptions" :key="item.id" @click="navigatorHandler(item)"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as RouterPath from "@/constants/path";
import { goto } from "@/helpers/functions";


export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  data(){
    return {
      leftMenuOptions: [
        { id: 1, name: "Add New Household",  path: RouterPath.NEW_HOUSEHOLD},
        { id: 2, name: "Edit/Add Homes", path: RouterPath.HOMES},
        { id: 3, name: "Edit Existing Entries", path: RouterPath.ENTRIES_EDIT},
        { id: 4, name: "Export Results",  path: RouterPath.EXPORT_RESULT},
        { id: 5, name: "Manager Users",  path: RouterPath.MANAGE_USERS},
      ],
    }
  },
  methods: {
    navigatorHandler(item){
      goto(item.path);
      // this.$router.push(item.path);
    }
  },
};
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';

  .menu-bar {
    background-color: $weirtonLeftMenu;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    padding-top: 20px;
  }

  .menu-item {
    cursor: pointer;
    width: 100%;
    color: #FFF;
    padding: 10px 15px;
    font-size: 20px;
    text-align: center;
  }
  
  .selected {
    background-color: #B5BABE;
    color: #FFF;
    font-weight: bold;
  }
</style>
