<template>
 <div id="exchange" >
  <div class="cont">
   <common v-if="!isApp"></common>
   <van-tabs v-model="activeTabs" color="#F3A02F" swipeable>
    <van-tab title="汽车服务">
     <div v-for="item in serverData" :key="item.serveId">
      <van-card  :thumb="item.banner_img" :centered=centered @click="routerServerInformation">
       <div slot="title">
        <span style="font-weight: 800;">{{item.title}}</span>
        <span style="color: #979797;float: right">1.1km</span>
       </div>
       <div slot="desc"  style="color: #979797">
        <div>浦东新区世纪大道1600号</div>
        <div>汽车保养/美容/洗车</div>
       </div>
      </van-card>
     </div>
    </van-tab>
    <van-tab title="实物周边">
     <ul>
      <li v-for="item in goodsData" @click="routerShopInformation">
       <div class="clear">
        <a  @click="routerShopInformation">
         <img :src="item.thum_img" >
        </a>
       </div>
       <h3 class="ellipsis">{{item.title}}</h3>
       <p>
        <span class="num">￥{{item.seller_price}}</span>
       </p>
      </li>
     </ul>
    </van-tab>
   </van-tabs>
  </div>
 </div>
</template>
<script>
 import common from "../..//components/common-head.vue"
 import common1 from "../../assets/img/home/1.png"
 import common2 from "../../assets/img/home/2.png"
 import server1 from "../../assets/img/home/server1.png"
 import { MessageBox } from 'mint-ui'
 import { Indicator } from 'mint-ui'
 export default {
  components:{'common':common,},
  data(){
   return {
    centered:true,//汽车服务详情居中
    goodsData: [
     {
    goodsId: "3",
    seller_price: "800.0000",
    thum_img: common1,
    title: "小V盒子3",
   },
    {
    goodsId: "2",
    seller_price: "800.0000",
    thum_img: common2,
    title: "小V盒子2"
   },
     {
      goodsId: "3",
      seller_price: "800.0000",
      thum_img: common1,
      title: "小V盒子3",
     },
     {
      goodsId: "2",
      seller_price: "800.0000",
      thum_img: common2,
      title: "小V盒子2"
     },
  ],//虚拟奖品奖励
    serverData:[
     {serveId: "1",
     title: "11",
     original_price: "222.0000",
     coupon_price: "50.0000",
     seller_price: "172.0000",
     banner_img: server1,
     goods_desc: "2221111223200",
     goods_brief: "11111111112222111112232"
    },
     {
     serveId: "2",
     title: "11",
     original_price: "222.0000",
     coupon_price: "50.0000",
     seller_price: "172.0000",
     banner_img: server1,
     goods_desc: "2221111223200",
     goods_brief: "11111111112222111112232"
    },
     {serveId: "3",
      title: "11",
      original_price: "222.0000",
      coupon_price: "50.0000",
      seller_price: "172.0000",
      banner_img: server1,
      goods_desc: "2221111223200",
      goods_brief: "11111111112222111112232"
     },
     {
      serveId: "4",
      title: "11",
      original_price: "222.0000",
      coupon_price: "50.0000",
      seller_price: "172.0000",
      banner_img: server1,
      goods_desc: "2221111223200",
      goods_brief: "11111111112222111112232"
     },
    ],//汽车服务
    isApp:false,
    activeTabs:0,
   }
  },
  created(){
  },
  methods:{
   //跳转到服务详情页
   routerServerInformation(){
    this.$router.push({path:'/home/serverInformation'})
   },
   routerShopInformation(){
    this.$router.push({path:'/home/shopInformation'})
   },

  }
 }
</script>
<style lang="less">
 .van-tab, .van-tag--large {
  font-size: 0.29rem;
 }
 .mint-loadmore{
  overflow: scroll !important;
 }
 .mint-loadmore-bottom{
  margin-bottom:0 !important;
 }


 #exchange {
  .num {
   color: #ff9a26;
  }
  nav {
   width: 100%;
   height: .9rem;
   line-height: .9rem;
   text-align: center;
   font-size: 0.3rem;
   display: flex;
   background: #fff;
   position: fixed;
   z-index: 100;
   top: .91rem;
   &.top{
    top: 0;
   }
   a {
    flex: 1;
    color: #757575;
   }
   .active {
    color: #ff9a26;
    border-bottom: 1px solid #ff9a26;
   }
  }
  .list-box{
   margin-top: .8rem;
   font-size: .3rem;
  }
  .list-box::-webkit-scrollbar {
   display:none;
  }
  ul {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   padding: 0.2rem 0.3rem 0;
   li {
    width: 3.25rem;
    margin-bottom: 0.15rem;
    > div {
     width: 3.25rem;
     height: 3.25rem;
     position: relative;
     border: 1px solid #eeeeee;
     .sold-out {
      position: absolute;
      width: 3.25rem;
      height: 3.25rem;
      background: rgba(0, 0, 0, 0.3);
      z-index: 12;
      .sold-icon {
       width: 1.65rem;
       height: 1.31rem;
       background: url(http://cdn1.damailicai.com/h5/integral/soldout@1x.png)  no-repeat;
       background-size: 100%;
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%, -50%);
      }
     }
     .discount-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.64rem;
      height: 0.99rem;
      line-height: .33rem;
      text-align: center;
      word-break: break-all;
      padding-top: .15rem;
      box-sizing: border-box;
      background: url(http://cdn1.damailicai.com/h5/integral/find_jfsc_zk_bj@2x.png) no-repeat;
      background-size: 100%;
      z-index: 11;
      p{
       font-size: .3rem;
       color: #FFFFFF;
       text-align: center;
      }
     }
     img {
      width: 3rem;
      height: 3rem;
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
     }
     .foot-icon {
      position: absolute;
      width: 0.66rem;
      height: 0.37rem;
      line-height: .37rem;
      text-align: center;
      background: #FF5657;
      color: #ffffff;
      right: 0.13rem;
      bottom: 0.14rem;
      font-size: .26rem;
      z-index: 11;
     }
    }
    h3 {
     font-size: .28rem;
     color: #212121;
     text-align: left;
    }
    p {
     line-height: 0.33rem;
     text-align: left;
     font-size: 0;
     span {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.24rem;
      margin-right: 0.05rem;
     }
    }
   }
  }
 }
 .ellipsis{
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
 }
 .van-card__content--centered {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 0.44rem;
 }
 .van-card__content {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
 }
 .van-card__thumb {
  position: relative;
  width: 1.94rem;
  height: 1.42rem;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
 }
 .van-card {
  position: relative;
  color: #323233;
  font-size: 0.3rem;
  padding: 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #ffffff;
 }
 .van-tabs .van-tab__pane {
  width: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: white;
 }
 .van-hairline--top-bottom::after {
  border-width: 0px 0;
 }
</style>
