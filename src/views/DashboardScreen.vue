<template>
  <div class="main-page">
    <div class="income_page">
      Dashboard Page
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

  .main-page {
    width: 100%;
    height: 100%;
  }

  .income_page {
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
</style>
