<template>
  <div class="wrap">
  	<v-nav></v-nav>

  	<v-footer></v-footer>
  </div>
</template>

<script>
import vNav from '@/components/nav'
import vFooter from '@/components/footer'
export default {
  name: 'index',
  components:{vNav,vFooter},
  data () {
    return {
    	
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
