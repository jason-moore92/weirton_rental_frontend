<template>
  <div class="main-page">
    <div class="">
      {{$route.path}}
      {{$route.name}}
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardScreen",
  components: {
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

  #dashboard{
    display: flex;
    height: calc(100vh - $appbarHeight);
    width: 100%;
  }

  .mainBody {
    width: 100%;
    height: 100%;
  }
</style>
