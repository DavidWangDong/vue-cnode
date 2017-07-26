<template>
  <div class="wrap">
  	<v-nav></v-nav>
  	<v-content>
  		<ul class="listWrap">
  			<li>
  				<div class="headInfo"></div>
  			</li>
  		</ul>
  	</v-content>
  	<v-footer></v-footer>
  </div>
</template>

<script>
import vNav from '@/components/nav'
import vFooter from '@/components/footer'
import vContent from '@/components/content'
import mixin from '@/mixin'
export default {
  name: 'index',
  mixins:[mixin],
  components:{vNav,vFooter,vContent},
  
  data () {
    return {
    	api:'topics'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.listWrap{
		width: 100%;
		background: #eee;
	}
	.listWrap>li{
		position: relative;
	    padding: 15px 15px 0 15px;
	    margin-bottom: 15px;
	    list-style: none;
	    box-shadow: 0 0 5px #ccc;
	    background: #fff;
	}
</style>
