<template>
	<div :class="[{modelHover:true},modelClass]" v-if="modelShow" @click.self="hideModel">

		<div class="confirm" v-if="modelType=='confirm'">
			<div class="massageWrap">
				<span>
					{{modelMassage}}
				</span>
			</div>
			<ul class="btnWrap">
				<li @click.self="sure">确认</li>
				<li @click.self="cancel">取消</li>
			</ul>
		</div>

		<div class="comment" v-if="modelType=='comment'">
			<div class="commentWrap">
				<textarea class="commentInfo" :placeholder="modelMassage" v-model="comment">
					
				</textarea>
			</div>
			<div class="subBtn" @click="to_sub">
				<span class="iconfont icon-edit" ></span>发表
			</div>
		</div>

	</div>
</template>	
<script type="text/javascript">
	
	export default{
		name:'modelView',
		props:['modelClass','modelType','modelShow','modelMassage','toUrl','hasMsg'],
		data () {
			return {
				comment:''
			}
		},
		methods:{
			hideModel () {
				this.$emit('hidemodel');
			},
			sure () {
				if (this.toUrl){
					this.$router.push({path:this.toUrl});	
				}
				this.hideModel();
				
			},
			cancel () {
				this.hideModel();
			},
			to_sub () {
		      if (this.comment==''){
		      	this.$emit('showtost','评论不能为空！');
		      	return ;
		      }
		      if (this.hasMsg){
		      	this.comment=this.modelMassage+this.comment;
		      }
		      this.$emit('comment',this.comment);
		      this.comment='';
		    }
		}
	}
</script>
<style type="text/css" scoped>
	.modelHover{
		background: rgba(0,0,0,0.5);
		position: fixed;
		z-index: 100;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.modelHover.tostClass{
		background: transparent;
	}

	.tost{
		padding: 15px 20px;
		font-size: 15px;
		color: #fff;
		background: rgba(0,0,0,0.5);
		margin:0 auto;
		border-radius: 5px;
		position: absolute;
		left: 50%;
		margin-left: -25%;
	}
	.confirm{
		    width: 60%;
		    background: #fff;
		    margin: 0 auto;
		    box-shadow: 0 0 5px #80bd01;
	}
	.massageWrap{
		display: flex;
	    padding: 16px;
	    min-height: 62px;
	    justify-content: center;
	    flex-direction: column;
	    font-size: 16px;
	}
	.btnWrap{
		display: flex;
	    height: 40px;
	    font-size: 16px;
	    border-top: 1px solid #ddd;
	}
	.btnWrap li{
		flex-grow: 1;
	    text-align: center;
	    line-height: 40px;
	    background: #80bd01;
	    color: #fff;
	}
	.btnWrap li:first-child{
		border-right:1px solid #fff;
	}
	.comment{
		    width: 70%;
    		margin: 0 auto;
    		box-shadow: 0 0 5px #80bd01;
	}
	.commentWrap{
		    min-height: 170px;
		    background: #fff;
		    padding: 5px;
		    box-sizing: border-box;
	}
	.commentInfo{
		    display: block;
		    height: 160px;
		    width: 100%;
		    background: #eff2f7;
		    outline: none;
		    resize: none;
		    border: none;
		    font-size: 15px;
	}
	.subBtn{
		height: 30px;
	    background: #80bd01;
	    color: #fff;
	    text-align: center;
	    line-height: 30px;
	    font-size: 16px;
	}
</style>