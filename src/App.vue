<template>
  <div class="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	async mounted() {

	},

	methods: {
		...mapActions([
			'restoreUser',
			'getGlobalData',
		]),
	},
}
</script>


<style lang="scss">
.app {
  font-family: 'Open Sans', sans-serif;
  height: 100%;
}
</style>
