<template>
	<div id="boon_rule" :class="{'head-top':!isApp}">
		<common v-if="!isApp" :title="title"></common>
		<ul class="boon_rule">
			<li>
				<h2><i>Q</i>什么是麦积分？</h2>
				<p><i>A</i>麦积分是大麦理财平台推出的虚拟福利，用于奖励平台活跃的用户，可用于 积分乐园活动或是兑换奖励等。</p>
			</li>
			<li>
				<h2><i>Q</i>如何获得麦积分？</h2>
				<p><i>A</i>目前可以通过 每日浇水，填写问卷，邀请好友，达成目标，参与不定期活动等方式获取积分。</p>
			</li><li>
			<h2><i>Q</i>麦积分有效期多久？</h2>
			<p><i>A</i>每年12月31日将清空上一年所获积分，请注意及时使用。<br />如： 2018年12月31日将清空 2017年12月31日 24:00之前获得的所有积分。</p>
		</li>
		</ul>
	</div>
</template>
<script>
  import common from "../components/common-head.vue"
	export default {
		name:'boon_rule',
    components:{
      'common':common
    },
		data(){
      return {
        title:'积分规则',
        isApp:false,
      }
		},
    created(){
      this.judgeApp()
    },
		methods:{
      judgeApp(){
        var t=this;
        var ua = navigator.userAgent;
        var iPhone = ua.indexOf('iPhone') != -1;
        if(ua.indexOf("damailicai_app") != -1){
          t.isApp=true;
          if(iPhone) {
            var param = {
              showBack: true,
              title: '积分规则',
              right: ''
            }
            try {
              JIClient.appSetHead(param);
            } catch(err) {};
          } else {
            try {
              JIClient.appSetHead(true, '积分规则', '');
            } catch(err) {};
          }
        }else{
          t.isApp=false;
        }
      }
		}
	}
</script>
<style lang="less">
.png(@img){
	background: url("http://cdn1.damailicai.com/discovery/boon/@{img}.png") center center no-repeat;
	background-size: 100%;
}
#boon_rule{
	height: 100%;background: #f3f3f3;
	.boon_rule{
		width: 7.5rem;margin: 0 auto;margin-top: .2rem;background: #fff;
		li{
			margin-bottom: .2rem;
			h2{
				font-size: .3rem;font-weight: normal;height: 1rem;line-height: 1rem;margin: 0 .3rem;background: #fff;border-bottom: 1px #eee solid;overflow: hidden;
				i{display: inline-block;width: .3rem;height: .3rem;line-height: .3rem;color: #fff;font-size: .26rem;font-style:
					normal;background:
					#FF9A26;border-radius:
					.04rem;text-align: center;vertical-align: middle;margin-right: .2rem;}
			}
			p{
				color: #757575;font-size: .26rem;line-height: .42rem;padding: .2rem .3rem;background: #fff;
				i{display: inline-block;width: .3rem;height: .3rem;line-height: .3rem;color: #fff;font-size: .26rem;font-style: normal;background: #4A90E2;border-radius:
					.04rem;text-align: center;vertical-align: middle;margin-right: .2rem;}
			}
		}
	}
}
</style>