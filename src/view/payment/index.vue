<template>
 <div class="payment">
     <!--头部-->
     <van-nav-bar
             title="支付"
             left-text=""
             left-arrow
             @click-left="onClickLeft"
     />
     <div class="payment-box">
         <!--需支付-->
         <div class="payment-information">
             <span class="payment-information-title">需支付:</span>
             <span class="payment-information-price">¥1299.00</span>
         </div>
         <div class="payment-time-down">
          支付剩余时间{{countDown}}
         </div>
         <!--支付方式-->
         <div class="payment-method">
            <div>支付方式</div>
             <div v-for="(item,i) in data.payType">
                 <div v-if="item=='3'" :class="i==0?'payment-menu-first':'payment-menu'">
                     <div class="payment-menu-information">
                         <img src="../../assets/img/payment/WeChat.png" class="payment-icon-wechat"/>
                         <span>微信支付{{i}}</span>
                     </div>
                     <img src="../../assets/img/payment/pitchOn.png" class="payment-status"/>
                 </div>
                 <div v-if="item=='2'" :class="i==0?'payment-menu-first':'payment-menu'">
                     <div class="payment-menu-information">
                         <img src="../../assets/img/payment/zhifubao.png" class="payment-icon-zhifubao"/>
                         <span>支付宝支付{{i}}</span>
                     </div>
                     <img src="../../assets/img/payment/pitchOn.png" class="payment-status"/>
                 </div>
                 <div v-if="item=='1'"  :class="i==0?'payment-menu-first':'payment-menu'">
                     <div class="payment-menu-information">
                         <img src="../../assets/img/payment/VCCT.png" class="payment-icon-vcct"/>
                         <span>VCCT支付{{i}}</span>
                     </div>
                     <img src="../../assets/img/payment/pitchOn.png" class="payment-status"/>
                 </div>
             </div>

         </div>
         <!--去支付-->
         <div class="payment-submit">支付</div>
     </div>
 </div>
</template>

<script>
    export default {
        data() {
           return{
            countDown:'15:00',
            data:{
                payType: ["1", "2", "3"],
                outTradeNo:"201903181698435815",
                orderId:"1402566941481",
            }
           }
       },
        methods:{
            onClickLeft(){

            }
        }
    }
</script>

<style lang="less">
 .payment-box{
     width: 90%;
     margin-left: 5%;
     line-height: 0.5rem;
     .payment-information{
         color: rgba(44,44,44,1);
         font-size: 0.36rem;
         .payment-information-title{
             float: left;
         }
         .payment-information-price{
             float: right;
         }
     }
     .payment-time-down{
         font-size: 0.3rem;
         color: rgba(151,151,151,1);
         width: 100%;
         clear:both;
     }
     .payment-method{
         font-size: 0.3rem;
         color: rgba(44,44,44,1);
         margin-top: 0.87rem;
         line-height: 0.52rem;
         position: relative;
         .payment-menu-first{
             display: flex;
             justify-content: space-between;
             letter-spacing: 0.1rem;
             width: 100%;
             clear: both;
             margin-top: 0.3rem;
             align-items: center;
         }
         .payment-menu{
             display: flex;
             justify-content: space-between;
             letter-spacing: 0.1rem;
             width: 100%;
             clear: both;
             margin-top: 0.8rem;
             align-items: center;
         }
         .wechat{
             margin-top: 0.2rem;
         }
         .payment-icon-wechat{
             width: 0.64rem;
             height: 0.52rem;
             float: left;
             margin-right: 0.1rem;
         }
         .payment-icon-zhifubao{
             width: 0.6rem;
             height: 0.6rem;
             float: left;
             margin-right: 0.1rem;
         }
         .payment-icon-vcct{
             width: 0.57rem;
             height: 0.23rem;
             float: left;
             margin-right: 0.1rem;
         }
         .payment-status{
             width: 0.28rem;
             height: 0.28rem;
             float: right;
         }
         .payment-menu-information{
             display: flex;
             align-items: center;
         }
     }
     .payment-submit{
         background-color: rgba(245,161,24,1);
         width:90% ;
         height: 0.73rem;
         color: white;
         font-size: 0.3rem;
         text-align: center;
         line-height: 0.73rem;
         letter-spacing: 0.25rem;
         font-family: Adobe Heiti Std;
         border-radius: 0.1rem;
         position: absolute;
         bottom: 0.73rem;
     }
 }


</style>
