<template>
  <div id="ex-detail">
     <div class="cont">
      <common-head v-if="!isApp" :title="title"></common-head>
      <div class="title">
        <div class="type">
          <span>兑换礼品</span>
          <span class="detail" v-text="oDetail.title"></span>
        </div>
        <div class="type">
          <span>兑换时间</span>
          <span class="detail" >{{oDetail.date}}&nbsp;{{oDetail.time}}</span>
        </div>
      </div>
      <div class="inte-num">
        <div class="type">
          <span>兑换前积分</span>
          <span class="detail" v-text="oDetail.before_money"></span>
        </div>
         <div class="type">
          <span>消耗积分</span>
          <span class="detail" v-text="oDetail.buy_price"></span>
        </div>
         <div class="type">
          <span>兑换后积分</span>
          <span class="detail" v-text="oDetail.virtual_money"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import common from "../components/common-head.vue"

export default {
  name:'exchange-detail',
  components:{
    'common-head':common,
  },
  data() {
    return {
      title:"兑换记录详情", 
      csrf:"", //csrf
      oDetail:"",//详情
      isApp:false,//是否app
    }
  },
  created(){
    var t=this;
    t.getDetail();
    t.judgeApp();
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
            title: '兑换记录详情',
          }
          try {
            JIClient.appSetHead(param);
          } catch(err) {};
        } else {//安卓
          try {
            JIClient.appSetHead(true, '兑换记录详情');
          } catch(err) {};
        }
      }else{
        t.isApp=false;
      }
    },
    getCsrf(){
      var t=this;
      t.csrf=	document.getElementsByName("csrf-token")[0].content;
		},
    getDetail(){
      var t=this;
      t.getCsrf();
      var orderId=location.href.split('?id=')[1];
      let data=new FormData();
      data.append('order_id',orderId);
      t.$http.post("/shop/exchange-detail",data,{
					headers: {
              'Content-Type': 'multipart/form-data',
							'X-CSRF-Token': t.csrf,
					}
    		}).then(function(res){
          var res=res.data;
          if(res.statusCode==0){
            t.oDetail=res.content;
            t.oDetail.date=t.oDetail.pay_time[0];
            t.oDetail.time=t.oDetail.pay_time[1];
            t.oDetail=JSON.parse(JSON.stringify(t.oDetail));
          } 
      })
    }
  }
}
</script>

<style  lang="less">
  #ex-detail{
    .cont{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f3f3f3;
      font-size: .3rem;
      color: #212121;
      padding-bottom: .2rem;
      .type{
        height: 1rem;
        line-height: 1rem;
        background: #ffffff;
        padding-left: .3rem;
        border-bottom: 1px solid #eeeeee;
        span:first-child{
          width: 1.9rem;
          display: inline-block;
        }
        .detail{
          color: #757575;
        }
        .nor-color{
          color: #212121;
        }
      }
      .inte-num{
        margin-top: .2rem;
      }
    }
  }
</style>
