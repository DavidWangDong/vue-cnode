<template>
  	<div class="content">
  		<slot></slot>
  	</div>
</template>

<script>
export default {
  name: 'vContent',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content{
		position: absolute;
		top:50px;
		bottom: 50px;
		right: 0;
		left: 0;
		overflow-y: auto;
		overflow-x:hidden;
	}
</style>
