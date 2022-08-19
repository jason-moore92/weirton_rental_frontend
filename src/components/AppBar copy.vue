<template>
  <div class="app-bar">
    <div>
      <img src="@/assets/images/logo.svg" class="icon-logo" />
    </div>
    <v-toolbar-title class="bar-title">Weirton Rental Administration</v-toolbar-title>
    <v-btn icon class="btn-logout" @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/main.scss';

.app-bar {
  height: $appbarHeight;
  background-color: $wAppBar;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .v-toolbar__content {
    justify-content: center;
  }

  .bar-title {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

  .btn-logout {
    color: white;
    span, i {
      color: white;
    }
  }
}

</style>
