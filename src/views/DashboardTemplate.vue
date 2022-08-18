<template>
  <div class="main-page">
    <AppBar />
    <div id="dashboard">
      <div class="col-2" style="padding: 0px;" >
        <LeftMenu />
      </div>
      <div class="col-10 mainBody">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/LeftMenu.vue';
import AppBar from '@/components/AppBar.vue';

export default {
  name: "DashboardTemplate",
  components: {
    LeftMenu,
    AppBar,
  },
  props: ['child'],
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

  .main-page {
    height: 100%;
  }
  #dashboard{
    display: flex;
    height: calc(100% - $appbarHeight);
    width: 100%;
  }

  .mainBody {
    width: 100%;
    height: 100%;
  }
</style>
