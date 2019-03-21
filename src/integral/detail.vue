<template>
  <div id="detail">
    <common-head v-if="!isApp" :title="title"></common-head>
    <div class="cont">
      <div class="good">
        <img :src="oDetail.head_image" >
        <span v-if="oDetail.discount_rate"  class="discount-icon"><p>{{oDetail.discount_rate}}</p><p>折</p></span>
      </div>
      <div class="good-back"></div>
      <div class="introduce">
        <h3 class="tl">{{oDetail.title}}</h3>
        <div class="integral">
          <span class="num-icon"></span>
          <span class="num">{{oDetail.seller_price}}</span>
          <span>积分</span>
          <span v-if="oDetail.show_price" class="discount">
            <span class="no-line"></span>
            <span class="no-icon"></span> 
            <span>{{oDetail.show_price}}</span>
            <span>积分</span>
          </span>
          <span class="remain">
            <span>剩余：</span>
            <span>{{oDetail.stocks}}</span>
            <span>件</span>
          </span>
        </div>
        <div class="number">
          <span>选择数量（每月限购 {{maxBuy}}件/人 ）</span>
          <span class="box">
            <span @click="reduce" class="reduce-icon">
              <!--<img src="http://cdn1.damailicai.com/h5/integral/find_jfsc_reduce@2x.png" alt="">-->
            </span>
            <input type="text" v-model="num" @input="checkNum">
            <span @click="add" class="add-icon"></span>
          </span>
        </div>
      </div>
      <div class="good-detail">
        <ul class="type">
          <li :class="{'active':isActive=='one'}" @click="changeType('one')">礼品简介</li>
          <li :class="{'active':isActive=='two'}" @click="changeType('two')">兑换须知</li>
        </ul>
        <div class="introduction" v-show="isActive=='one'" v-html="oDetail.remark">
        </div>
        <div v-show="isActive=='two'" class="instruction">
          <h3><span class="icon"></span><span class="title">兑换到账时间？</span></h3>
          <div>
            <p><span class="icon"></span><span class="title">红包，体验金，免费提现次数 在您兑换成功后即时到账；</span></p>
            <p><span class="icon"></span><span class="title">话费 在您兑换成功后 5个工作日内充值至您帐号绑定的手机；</span></p>
            <p><span class="icon"></span><span class="title">京东E卡，爱奇艺会员卡在您兑换成功后 7个工作日内，以短信方式将兑换码 发送至您帐号绑定的手机；</span></p>
            <p><span class="icon"></span><span class="title">如派奖过程中，您更换了绑定手机，则以派奖时实际显示的手机号为准；</span></p>
            <p><span class="icon"></span><span class="title">实物礼品在您兑换成功后 15个工作日内为您安排配送，请务必填写准确的邮寄地址。</span></p>
          </div>
          <h3><span class="icon"></span><span class="title">注意事项？</span></h3>
          <div>
            <p><span class="icon"></span><span class="title">积分兑换礼品非现金买卖商品，仅为大麦理财为答谢用户所提供的回赠服务，不提供发票。</span></p>
            <p><span class="icon"></span><span class="title">大件实物礼品如需保修，请与客服联系；</span></p>
            <p><span class="icon"></span><span class="title">除在运送途中发生损毁或本身存在质量瑕疵以外，恕不允许退货或换货。</span></p>
            <p><span class="icon"></span><span class="title">符合退换货条件的用户，请在礼品签收后，及时与客服联系退换货。残次礼品寄回时，请务必保留原包装、内附说明书及相关文件。</span></p>
            <p><span class="icon"></span><span class="title">积分兑换不支持刷奖等恶意行为，一经发现大麦理财有权取消其获奖资格或者删除其订单；一旦换购成功，则在换购中所消耗的积分不再返还。</span></p>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="consum tl">
        <span>消耗积分</span>
        <span v-text="seller_price"></span>
        <a href="javascript:void(0)" v-if="oDetail.stocks!=0" class="tc" @click="exchange">积分兑换</a>
        <a href="javascript:void(0)" v-else class="sell-out tc">已抢光</a>
      </div>
      <div class="points tl">
        <span v-if="isLogin">
          <span>我的积分</span>
          <span v-text="virtualNum"></span>
        </span>
        <span v-else @click="goLogin">登录查看我的积分</span>
      </div>
    </footer>
		<login v-show="showLogin" @close-login='closeLogin' @login-success="loginSuccess"></login>
  </div>
</template>
<script type="text/javascript">
import elHead from '../components/common-head'
import login from "../components/login.vue"
import { MessageBox } from 'mint-ui'

export default {
  name:'detail',
  components:{
    "common-head":elHead,
    'login':login
  },
  created(){
    var t=this;
    t.getDetail();
    t.login();
    t.getNum();
    t.judgeApp();
  },
  data() {
    return {
      title:"积分兑换",
      isActive:"one",//简介，须知，展示
      oDetail:{},//详情
      flag:true,//点击兑换的flag
      num:1,//兑换数量
      goodsId:"",//商品id
      kind: 3,//商品类型1为实物，3为虚拟
      sellOut:true,//售完否
      showLogin:false,//显示登录框
      maxBuy:"",//限购
      csrf:"",//csrf
      isLogin:false,//是否登录
      isApp:false,//是否app
      virtualNum:0,//我的积分
      isNew:1
    }
  },
  computed:{
    seller_price(){
      return this.num*this.oDetail.seller_price;
    }
  },
  methods:{
    //获取积分
    getNum(){
      var t=this;
      if(localStorage.getItem("virtualNum")){
        t.virtualNum=localStorage.getItem('virtualNum');
      }
    },
    judgeApp(){
      var t=this;
      var ua = navigator.userAgent;
      var iPhone = ua.indexOf('iPhone') != -1;
      if(ua.indexOf("damailicai_app") != -1){
        t.isApp=true;
        if(iPhone) {
          var param = {
            showBack: true,
            title: '积分兑换',
          }
          try {
            JIClient.appSetHead(param);
          } catch(err) {};
        } else {//安卓
          try {
            JIClient.appSetHead(true, '积分兑换',"");
          } catch(err) {};
        }
      }else{
        t.isApp=false;
      };
    },
    //监听兑换数量
    checkNum(){
      var t=this;
      if(t.num<0){
        t.num=0;
      }
      if(t.num>t.maxBuy){
        t.num=t.maxBuy;
        MessageBox({
          title: '温馨提示',
          message: '您当前只能兑换'+t.maxBuy+'个',
        });
      }
    },
    //去登录
    goLogin(){
      var t=this;
      var ua = navigator.userAgent;
      if(ua.indexOf("damailicai_app") != -1){
        var version = ua.split('damailicai_app/')[1].split(';')[0];
        if(version < '3.2.0'){
            if(ua.indexOf('iPhone') != -1){
                quicklogin(url)
            }else{
                try{JIClient.appClose();JIClient.appLogin();}catch(err){};
            }
        }else{
            try{JIClient.appLogin();}catch(err){};
        }
        return false;
      }
      t.showLogin=true;
    },
    //登录成功
    loginSuccess(){
      var t=this;
      t.showLogin=false;
      t.isLogin=true;
      t.getDetail();
    },
    //关闭登录框
    closeLogin(){
      var t=this;
      t.showLogin=false;
    },
    //判断是否登录
    login(){
        var t=this;
				t.getCsrf();
				t.$http.post('/shop/is-login',{
				},{
					headers: {
							'X-CSRF-Token': t.csrf,
					}
    		}).then(function(res){
          var res=res.data;
					if(res.statusCode==0){
            t.isLogin=true;
          }
				}).catch(function(err){
				})
    },
    //减
    reduce(){
      var t=this;
      if(t.num==0){
        return false;
      }
      t.num--;
    },
    //加
    add(){
      var t=this;
      if(t.num==t.oDetail.stocks){
        MessageBox({
            title: '温馨提示',
            message: '兑换数量不能大于剩余的'+t.oDetail.stocks+'个',
          });
        return false;
      }
      if(t.num==t.maxBuy){
         MessageBox({
            title: '温馨提示',
            message: '您当前只能兑换'+t.maxBuy+'个',
          });
        return false;
      }
      t.num++;
    },
    getCsrf(){
      var t=this;
      t.csrf=	document.getElementsByName("csrf-token")[0].content;
    },
    //切换简介，展示
    changeType:function(n){
     var t=this;
      t.isActive=n;
    },
    //兑换
    exchange(){
      var t=this;
      if(!t.isLogin){//未登录
        t.showLogin=true;
        return false;
      };
      if(t.num==0){
        MessageBox({
          title: '温馨提示',
          message: '请选择兑换数量',
        });
        return false; 
      }
      if(t.virtualNum<t.oDetail.seller_price){
         MessageBox({
            title: '温馨提示',
            message: '您当前积分不足',
          });
          return false; 
      }
      if(t.isNew==1&&t.kind==1) {
        MessageBox.confirm('', {
          title: '温馨提示',
          message: '完成首次出借即可兑换奖励',
          confirmButtonText: '去出借',
          cancelButtonText: '稍后再说'
        }).then(action => {
          if (action == 'confirm') {
            if(t.isApp){
              try{JIClient.appGoInvest();}catch(err){};
            }else{
              location.href='/index/borrowbytime'
            }
          }
        }).catch(err => {
          if (err == 'cancel') {
            console.log('cancel')
          }
        });
        return false;
      }
      var detail={
        title:t.oDetail.title,
        need:t.oDetail.seller_price,
        goodsId:t.oDetail.goods_id,
        number:t.num,
        kind:t.oDetail.kind
      }
      t.saveSure(detail);
      t.$router.push("/sure");
    },
    //保存详情
    saveSure(detail){
      var t=this;
      var detail=JSON.stringify(detail);
      localStorage.setItem('sureDetail',detail);
    },
    //html解码
    htmlDecode(text){
      var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
          //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    //获取详情
    getDetail(){
      var t=this;
      var id=location.href.split('?id=')[1];
      t.getCsrf();
      let data=new FormData();
      data.append('goods_id',id);
      t.$http.post("/shop/detail",data,{
					headers: {
            'Content-Type': 'multipart/form-data',
						'X-CSRF-Token': t.csrf,
					}
    		}).then(function(res){
        var res=res.data;
        if(res.statusCode=="0"){
          var detail=res.content;
          if(detail.show_price!=detail.seller_price){
            detail.discount_rate=Math.floor(Number(detail.seller_price)*100/Number(detail.show_price))/10;
          }
          t.oDetail=detail;
          t.oDetail.remark=t.htmlDecode(t.oDetail.remark);
          t.maxBuy=res.content.max_buy;	
          t.goodsId=res.content.goods_id;
          t.kind=res.content.kind;
          t.isNew=res.content.isnew;

          t.virtualNum=Math.floor(res.content.virtual_money);
          localStorage.setItem('virtualNum',t.virtualNum);
        }
      }).catch(function(err){
        console.log(err)
      })
    }
  }
}
</script>

<style  lang="less">
  .mint-msgbox-btns{
    margin-right: 1px;
  }
#detail{
  .cont{
    padding-bottom: 2.46rem;
  }
  .good{
    height: 5rem;
    position: relative;
    img{
      width: 5.58rem;
      height: 4.32rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .discount-icon{
      width: 0.64rem;
      height: 0.99rem;
      line-height: .33rem;
      text-align: center;
      word-break: break-all;
      font-size: .3rem;
      padding-top: .15rem;
      box-sizing: border-box;
      color: #FFFFFF;
      background: url(http://cdn1.damailicai.com/h5/integral/find_jfsc_zk_bj@2x.png) no-repeat;
      background-size: 100%;
      position: absolute;
      top: 0;
      right: .65rem;
     	p{
        font-size: .3rem;
        color: #FFFFFF;
        text-align: center;
      }
    }
  }
  .good-back{
    height: .24rem;
    background-image: linear-gradient(-180deg, rgba(238,238,238,0.00) 0%, #D8D8D8 100%);
  }
  .introduce{
    padding: .3rem;
    font-size: .26rem;
    color: #212121;
    h3{
      font-size: .34rem;
    }
    .integral{
      font-size: .26rem;
      color: #757575;
      margin: .2rem 0 .4rem;
      span{
        display:inline-block;
        line-height: .5rem;
        vertical-align: baseline;
      }
      .num-icon{
        width: .23rem;
        height: .25rem;
        background: url(http://cdn1.damailicai.com/h5/integral/jifentubiao@1x.png) no-repeat;
        background-size: 100%;
      }
      .num{
        color: #FF9A26;
        font-size: .34rem;
      }
      .no-icon{
        width: .23rem;
        height: .25rem;
        background: url(http://cdn1.damailicai.com/h5/integral/fing_jfsc_jb_yj@2x.png) no-repeat;
        background-size: 100%;
      }
      .no-line{
        position: absolute;
        width: 1.6rem;
        height: 1px;
        background: #9B9B9B;
        margin-top: .25rem;
      }
      .remain{
        float: right;
        margin-right: .3rem;
      }
      .discount{
        margin-left: .3rem;
      }
    }
    .number{
      color: #757575;
      line-height: .6rem;
      .box{
        width:2.18rem;
        height: .58rem;
        line-height: .58rem;
        border: 1px solid #cecece;
        float: right;
        span{
          display: inline-block;
          vertical-align: middle;
        }
        .reduce-icon{
          width: .3rem;
          height: .02rem;
          background: url("http://cdn1.damailicai.com/h5/integral/find_jfsc_reduce@2x.png") no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          margin:0 .1rem;

        }
        input{
          width: 1rem;
          text-align: center;
          border-left:1px solid #CECECE;
          border-right:1px solid #CECECE;
          display: inline-block;
          vertical-align: middle;
        }
        .add-icon{
          width: .3rem;
          height: .3rem;
          background: url("http://cdn1.damailicai.com/h5/integral/fing_jfsc_add@2x.png") no-repeat;
          -webkit-background-size: 100%;
          background-size: 100%;
          margin-left: .05rem;
        }

      }
    }
  }
  .instruction{
    background: #ffffff;
    h3{
      height: 1rem;
      line-height: 1rem;
      font-size: .3rem;
      padding-left: .3rem;
      color: #212121;
      font-weight: normal;
      border-bottom: 1px solid #eeeeee;
      .icon{
        position: absolute;
        width: .08rem;
        height: .26rem;
        background: #ff9a26;
        margin-top: .35rem;
      }
      .title{
        margin-left: .25rem;
      }
    }
    >div{
      padding: .3rem .3rem .3rem .7rem;
      color: #757575;
      font-size: .26rem;
      line-height: .36rem;
    }
    p{
      margin-bottom: .06rem;
      .icon{
        position: absolute;
        width: .16rem;
        height: .16rem;
        border-radius: 50%;
        background: #FF9A26;
        margin: .1rem 0 0 -0.25rem;
      }
    }
  }
  .good-detail{
    background: #f3f3f3;
    padding-top: .2rem;
    .type{
      background: #ffffff;
      display: flex;
      font-size: .3rem;
      color: #757575;
      li{
        flex: 1;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
      }
      .active{
        color: #FF9A26;
        border-bottom: 2px solid #ff9a26;
      }
    }
    .show-detail{
      background: #ffffff;
      ul{
        width: 6.9rem;
        margin: auto ;
        padding-top: .2rem;
        li{
          margin-bottom: .7rem;
          img{
            width: 6.9rem;
          }
        }
      }
    }
    .introduction{
      padding: .3rem;
      background: #ffffff;
      font-size: .3rem;
    }
  }
  footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: .3rem;
    >div{
      padding: 0 .3rem;
    }
    .consum{
      width: 7.5rem;
      height:1.2rem;
      line-height: 1.2rem;
      background: #ffffff;
      a{
        width: 2.4rem;
        height: .68rem;
        border-radius: .68rem;
        line-height: .68rem;
        color: #ffffff;
        background: #FF9A26;
        float: right;
        margin-top: .26rem;
        margin-right: .6rem;
      }
      .sell-out{
        background: #CECECE;
      }
      >span:first-child{
        color: #757575;
      }
    }
    .points{
      width: 7.5rem;
      height: 1rem;
      line-height: 1rem;
      background:#4c4c4c;
      color: #ffffff;
    }
  }
}
</style>
