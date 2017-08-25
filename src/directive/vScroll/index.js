import $ from 'jQuery'
export default{
			 
			inserted (el,binding,vnode) {
	  			el.scrollTop=vnode.context.scrollTop;
	  			let timer=null;
	  			$(el).on('scroll',(e)=>{
	  				if (timer){
	  					return;
	  				}
	  				let that=this;
	  				timer=setTimeout(()=>{
	  					vnode.context.scrollTop=el.scrollTop;
	  					if (binding.arg&&binding.arg=='chgPage'){
	  						let limit=$(el).children().height()-$(el).height();
		  					limit=limit<=0?0:limit;
		  					if (Math.abs(el.scrollTop-limit)<=5){
		  						
		  							vnode.context.page++
		  							
		  					}
		  					clearTimeout(timer);
	  					}
	  					timer=null;
	  				},200);
	  			})
	  		}
	}