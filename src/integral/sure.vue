<template>
  <div id="sure">
    <common-head v-if="!isApp" :title="title"></common-head>
    <div class="cont">
      <div class="type no-border">
        <span>您即将兑换</span>
        <span class="detail" >{{sureDetail.title}}*{{sureDetail.number}}</span>
      </div>
      <div class="inte-num">
        <div class="type">
          <span>兑换前积分</span>
          <span class="detail" v-text="virtualNum"></span>
        </div>
        <div class="type">
          <span>消耗积分</span>
          <span class="detail" v-text="sureDetail.need"></span>
        </div>
        <div class="type">
          <span>兑换后积分</span>
          <span class="detail nor-color" v-text="changeNum"></span>
        </div>
      </div>
      <div class="line">
        <div class="line-back"></div>
      </div>
      <!-- 虚拟产品 -->
      <div v-if="sureDetail.kind!=1" class="instruction">
        <h3 class="tc">兑换须知</h3>
        <p>
          <span>*</span>
          <span> 红包，体验金，免费提现次数在您兑换成功后即时到账；</span>
        </p>
        <p>
          <span>*</span>
          <span> 话费在您兑换成功后3个工作日内充值至您账号绑定的手机；</span>
        </p>
        <p>
          <span>*</span>
          <span> 京东E卡，爱奇艺会员卡等需要自行充值绑定的奖励，将在您兑换成功后5个工作日内，以短信的方式将兑换码发送至您账号绑定的手机；</span>
        </p>
        <p>
          <span>*</span>
          <span> 如派奖过程中，您更换了绑定手机；则以派奖时实际显示的手机号为准。</span>
        </p>
      </div>
      <!-- 实物地址 -->
      <div v-else class="address">
         <p class="explain">
           礼品将在7个工作日内安排寄出，请务必确认您的邮寄地址可正常收件
        </p>
        <form>
            <div>
                <span>收货人</span>
                <input v-model="recipients" type="text" placeholder="请输入收货人姓名">
            </div>
            <div>
                <span>手机号码</span>
                <input v-model="mobile" type="text" placeholder="请输入手机号码">
            </div>
            <div>
                <span>收货地址</span>
                <span class="city" v-text="city" @click="visible=!visible">请选择地址</span>
            </div>
            <div class="detail-address">
                <span>详细地址</span>
                <textarea v-model="address" placeholder="请输入详细地址"></textarea>
            </div>
        </form>
      </div>
    </div>
    <footer>
      <a @click="confirmOrder" href="javascript:void(0)">确认下单</a>
    </footer>
    <city-picker  @on-finish="handleFinish" v-model="visible" ></city-picker>  
  </div>
</template>

<script type="text/javascript">
  import common from "../components/common-head.vue"
	import { MessageBox } from 'mint-ui'
  import cityPicker from 'vue-citypicker'
  export default {
    name:'sure',
    components:{
      'common-head':common,
      'city-picker':cityPicker,
    },
    data() {
      return {
        title:"确认兑换",
        flag:true,//避免兑换多次
        changeNum:0,//兑换后的积分
        csrf:"",//csrf
        sureDetail:{},//确认详情
        virtualNum:0,//积分数量
        fullAddress:"",//完整地址
        city:"请选择地址",//省市区
        address:"",//详细地址
        visible:false,//citypicker弹窗
        recipients:"",//收件人
        mobile:"",//收件人手机号
        isApp:false,
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
              title: '确认兑换',
            }
            try {
              JIClient.appSetHead(param);
            } catch(err) {};
          } else {//安卓
            try {
              JIClient.appSetHead(true, '确认兑换',"");
            } catch(err) {};
          }
        }else{
          t.isApp=false;
        }
      },
      //选择结束
      handleFinish(selected){
        var t=this;
        t.city=selected.province.name+selected.city.name+selected.area.name;
      },
      //获取地址
      getAddress(){
        var t=this;
        t.getCsrf();
        t.$http.post("/shop/get-address","",{
          	headers: {
							'X-CSRF-Token': t.csrf,
					}
        }).then(function(res){
          var res=res.data;
          if(res.statusCode==0){
            if(!!res.content.consignee){
              t.recipients=res.content.consignee;
            };
            if(!!res.content.phone){
              t.mobile=res.content.phone;
            };
            if(!!res.content.city&&!!res.content.area){
              t.city=res.content.city+res.content.area;
            };
            if(!!res.content.address){
              t.address=res.content.address;
            }
           
          }
        }).catch(function(){

        })
      },
      //确认详情
      getDetail(){
        var t=this;
        var num=localStorage.getItem('virtualNum');
        var detail=localStorage.getItem("sureDetail");
        detail=JSON.parse(detail);
        t.sureDetail=detail;
        t.sureDetail.need=Number(t.sureDetail.need)*Number(t.sureDetail.number);
        t.virtualNum=num;
        t.changeNum=Number(t.virtualNum)-Number(t.sureDetail.need);
        if(detail.kind==1){
          t.getAddress();
        }
      },
      getCsrf(){
				var t=this;
				t.csrf=	document.getElementsByName("csrf-token")[0].content;
      },
      
      //检查表单
      check(){
        var t=this;
        var mobileReg=/^\d{11}$/;
        if(!t.recipients){
          MessageBox({
            title: '温馨提示',
            message: "请输入收件人",
          });
          return false;
        };
        if(!mobileReg.test(t.mobile)){
          MessageBox({
            title: '温馨提示',
            message: "请输入正确的手机号",
          });
          return false;
        };
        if(!t.city||!t.address){
          MessageBox({
            title: '温馨提示',
            message: "您输入的地址不能为空",
          });
          return false;
        }
        return true;
      },

      //下单
      confirmOrder(){
        var t=this;
        if(t.sureDetail.kind==1){//实物
          if(!t.check()){//校验地址联系人；
            return false;
          };
        }
        if(!t.flag){//避免重复
          return false;
        };
        t.flag=false;
      
        t.getCsrf();
        var data=new FormData();
        data.append('id',t.sureDetail.goodsId);
        data.append('num',t.sureDetail.number);
        data.append("recipients",t.recipients);
        data.append("mobile",t.mobile);
        if(t.sureDetail.kind==1){//实物
          data.append("address",t.city+t.address);
        }
        t.$http.post('/shop/buy',data,{
					headers: {
							'X-CSRF-Token': t.csrf,
					}
    		}).then(function(res){
            var res=res.data;
             if(res.statusCode==0){
                MessageBox({
                  title: '温馨提示',
                  message:"兑换成功" ,
                }).then(action =>{  
                  t.$router.push('/')
                });
             }else{
                MessageBox({
                  title: '温馨提示',
                  message: res.message,
                });
                t.flag=true;
             }
					}).catch(function(err){
                t.flag=true;
					});
      }
    }
  }
</script>

<style  lang="less">
#sure{
  .cont{
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
     .no-border{
      border-bottom: none;
    }
    .inte-num{
      margin-top: .2rem;
    }
    .line{
      width: 7.5rem;
      height: .3rem;
      background: #f3f3f3;
      .line-back{
          width: 7.5rem;
          height: .12rem;
          background: url("http://cdn1.damailicai.com/h5/integral/fengexian@1x.png") no-repeat;
          background-size: 100%;
      }
    }
    .instruction{
      background: #ffffff;
      padding: .3rem .3rem 1.2rem;
      h3{
        margin-bottom: .2rem;
      }
      p{
        font-size: .28rem;
        color: #000000;
        line-height: .4rem;
        span:first-child{
          color: #FF9A26;
        }
      }
    }
    .address{
      form{
        background: #ffffff;
        >div{
            padding: 0 .3rem;
            height: 1rem;
            font-size: 0;
            border-bottom: 1px solid #EEEEEE;
            >span{
              font-size: .3rem;
              &:first-child{
                display: inline-block;
                width: 1.8rem;
                line-height: 1rem;
                vertical-align: top;
              }
              &.city{
                display: inline-block;
                max-width: 5rem;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
                line-height: 1rem;
              }
            }
            input{display: inline-block;line-height: 1rem;font-size: .3rem;}
        }
        .detail-address{
            height: 1.8rem;
            textarea{
              width: 5.1rem;
              font-size: .28rem;
              margin-top: .32rem;
              border: none;
              resize: none;
              height: 1.2rem;
            }
        }
      }
      .explain{
        height: 1.14rem;
        font-size: .26rem;
        line-height: .37rem;
        color: #757575;
        background: #ffffff;
        padding: .2rem .3rem 0;
        margin-bottom: .2rem;
        box-sizing: border-box;
      }
    }
  }
  footer{
    height: 1.46rem;
    padding-top: .4rem;
    a{
      display: block;
      background: #FF9A26;
      border-radius: 1rem;
      width: 6.4rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-size: .34rem;
      color: #ffffff;
      margin: auto ;
    }
  }
}
</style>
