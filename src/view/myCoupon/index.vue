<template>
<div id="myCoupon">
    <!--头部-->
    <van-nav-bar
            title="我的券包"
            left-text=""
            right-text="使用记录"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />
    <!--优惠券-->
    <ul>
        <li @click="click(index)" v-for="(item,index) in items">
            <img class="img1" :src="item.img" />
            <div class="content">
                <p>¥<i>{{item.price}}</i></p>
                <span>{{item.type}}</span>
                <img class="img2" src="../../assets/img/shop_16.png"/>
            </div>
            <footer>
                优惠券号码：{{item.code}}
            </footer>
        </li>
    </ul>
    <!--弹窗-->
    <div v-if="isShowConfirm" class="my-confirm" @click="clickFun">
        <div class="confirm-content-wrap" @click.stop>
            <div class="borderTop"></div>
            <div class="money">¥<span>{{windowsMoney}}</span></div>
            <div class="windowsType">{{windowsType}}</div>
            <img :src="qrCode">
            <div class="ticketCode">优惠券号码：{{ticketCode}}</div>
            <div class="rule" @click="close">
                <p>使用规则：</p>
                <span>
                    为复合物 iu 恢复 i 额外花费话费话费发挥大声疾呼分开就收到回复康师傅后 if 好方法后卫分行为恶妇个皮肤和 iu 俄皮肤黑我复合化肥 u
                    恢复 iu 儿歌和热哦日哦 i雕刻家佛诶合肥 u 入会费日 u
                </span>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
    #myCoupon{
        height: 100%;
        background-color:#f0f0f0;
    }
    .van-nav-bar__text{
        color:rgba(44,44,44,1);
    }
    ul{
        width: 100%;
        margin:.3rem auto;
    }
    ul li{
        position:relative;
        width: 90%;
        margin-left:5%;
        height: 1.53rem;
        margin-bottom:.22rem;
    }
    ul li .img1{
        height: 1.53rem;
        width: 100%;
        position:absolute;
        left:0;
        top:0;
    }
    ul li .content{
        position:absolute;
        display:flex;
        justify-content: space-between;
        width: 90%;
        margin-left: 5%;
    }
    ul li .content p{
        color: #fff;
        font-size: .24rem;
        margin-top: .18rem;
    }
    ul li .content p i{
        font-style: normal;
        font-size:.57rem;
    }
    ul li .content span{
        color: #fff;
        font-size: .22rem;
        display: block;
        margin-top: .4rem;
    }
    ul li .content .img2{
        height: .58rem;
        width: 1.1rem;
        margin-top:.25rem;
    }
    ul li footer{
        font-size:.18rem;
        width: 100%;
        text-align: center;
        color:rgba(200,198,198,1);
        position: absolute;
        bottom: .05rem;
    }
    .my-confirm {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 998;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    /* 进入和出去的动画 */
    .confirm-fade-enter-active {
        animation: opacity 0.3s;
    }
    .confirm-fade-enter-active .confirm-content-wrap {
        animation: scale 0.3s;
    }
    .confirm-fade-leave-active {
        animation: outOpacity 0.2s;
    }
    .confirm-content-wrap {
        position: absolute;
        top: 0%;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 10rem;
        margin: auto;
        background-color: #fff;
        border-radius: 5px;
        z-index: 999;
        user-select: none;
        background: url(/static/img/shop_18.47527d4.png) no-repeat;
        background-size: 100% 100%;
    }
    .confirm-content-wrap .borderTop{
        position: absolute;
        background: rgba(104,67,14,1);
        width: 92%;
        left: 4%;
        height: .1rem;
        top: .5rem;
    }
    .confirm-content-wrap .money{
        width: 100%;
        text-align: center;
        font-size: .24rem;
        color: rgba(104,67,14,1);
        margin-top: 1rem;
        font-weight: 900;
        letter-spacing: .02rem;
    }
    .confirm-content-wrap .money span{
        font-size:.57rem;
    }
    .confirm-content-wrap .windowsType{
        width: 100%;
        text-align: center;
        color: rgba(104,67,14,1);
        font-size: .28rem;
        letter-spacing: .03rem;
        font-weight: 900;
    }
    .confirm-content-wrap img{
        display: inherit;
        height: 2.7rem;
        width: 2.7rem;
        margin:.2rem auto;
    }
    .confirm-content-wrap .ticketCode{
        width: 100%;
        text-align: center;
        font-size:.18rem;
        letter-spacing: .02rem;
        color:rgba(104,143,142,1);
    }
    .confirm-content-wrap .rule{
        color: rgba(104,67,14,1);
        font-size: .18rem;
        width: 70%;
        margin: 1rem auto 0;
        line-height: .35rem;
    }
    @keyframes opacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes scale {
        0% {
            transform: scale(0);
        }
        60% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes outOpacity {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
<script>
    import common1 from "../../assets/img/shop_15.png"
    import common2 from "../../assets/img/shop_17.png"
    import common3 from "../../assets/img/shop_20.png"
    export default {
        data(){
            return {
                items:[
                    {
                        img:common1,
                        price:100,
                        type:'通用券',
                        code:'123456789'
                    },
                    {
                        img:common1,
                        price:100,
                        type:'通用券',
                        code:'123456789'
                    },
                    {
                        img:common1,
                        price:100,
                        type:'通用券',
                        code:'123456789'
                    }
                ],
                isShowConfirm: false, // 用于控制整个窗口的显示/隐藏
                money:100,
                windowsMoney:100,
                windowsType:'通用券',
                qrCode:common3,
                ticketCode:1234567890098765,
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
            onClickRight() {
                Toast('');
            },
            click:function(index){
                this.isShowConfirm = true;
            },
            clickFun:function(){
                this.isShowConfirm = false;
            },
            close:function(){
                this.isShowConfirm = false;
            }
        }
    }
</script>
