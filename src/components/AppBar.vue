<template>
  <div class="app-bar">
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
  background: $weirtonBlack;
  display: flex;
  align-items: center;
  justify-content: center;

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
    position: absolute;
    right: 10px;
    color: white;

    span, i {
      color: white;
    }
  }
}

</style>
