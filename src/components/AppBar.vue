<template>
  <div class="app-bar">
    <div>
      <!-- <img src="@/assets/images/logo.svg" class="icon-logo"  /> -->
      <v-app-bar-nav-icon class="btn-menu" @click.stop="sidebarHandler()" />
    </div>
    <v-toolbar-title class="bar-title">Weirton Rental Administration</v-toolbar-title>
    <!-- <v-btn icon class="btn-logout" @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn> -->
    <div> &nbsp; </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    props: { showSidebar: Boolean, },
    data() {
      return {
       
      }
    },
    computed: {
      ...mapGetters(["isLoggedIn"]),
    },
    methods: {
      ...mapActions(["logout"]),
      logoutUser() {
      },
      sidebarHandler (){
        this.$emit('sidebarHandler');
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';

  .app-bar {
    position: absolute;
    width: 100%;
    height: $appbarHeight;
    background-color: $wAppBar;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 99;

    .v-toolbar__content {
      justify-content: center;
    }

    .bar-title {
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }

    .btn-menu {
        display: none;
      }

    .btn-logout {
      color: white;
      span, i {
        color: white;
      }
    }
  }

  @media screen and (max-width: 960px) {
    .app-bar {
      .btn-menu {
        display: block;
        i {
          color: white;
        }
      }
      .icon-logo {
        display: none;
      }
    }
  }

</style>
