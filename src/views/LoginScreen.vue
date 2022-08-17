<template>
  <div class="main-page">
  </div>
</template>
<script>

import * as RouterPath from "@/constants/path";
import { goto } from "@/helpers/functions";

export default {
  name: "LoginScreen",
  components: {
  },
  created(){
    setTimeout( () => this.$router.push( RouterPath.DASHBOARD), 500);
  },
  data () {
    return {
      
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/css/main.scss';

</style>
