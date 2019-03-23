<template>
    <div>
        <!--头部-->
        <van-nav-bar
                title="填写订单"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        <!--信息-->
        <div class="header-wrap">
            <header>
                <h4>收货人：{{name}}</h4>
                <h4>手机号：{{phone}}</h4>
                <p>地址：{{address}}</p>
                <img src="../../assets/img/shop_11.png"/>
            </header>
        </div>
        <!--介绍-->
        <div class="Introduction">
            <img src="../../assets/img/shop_5.png"/>
            <h4>{{title}}</h4>
            <p>规格型号：{{color}}</p>
            <p>单价：¥{{price}}元</p>
        </div>
        <!--价钱数量-->
        <div class="money">
            <p>购买数量：{{num}}</p>
            <p>购买总额：<span>¥{{money}}</span></p>
        </div>
        <button class="btn">去支付</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'王小毛',
                phone:'13909187198',
                address:'上海市普陀区古浪路555弄祁连家园222号1109室',
                title:'汽车风口香薰',
                color:'银色',
                price:'40',
                num:'2',
                money:'80'
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
        }
    }
</script>

<style scoped>
    .header-wrap{
        width: 100%;
        height: 1.8rem;
        border-bottom:.06rem solid rgba(243,243,243,1);
    }
    .header-wrap header{
        width: 90%;
        margin:0 auto;
        position:relative;
    }
    .header-wrap header h4{
        color:rgba(44,44,44,1);
        font-size:.22rem;
        line-height: .5rem;
        letter-spacing: .02rem;
    }
    .header-wrap header h4:nth-child(1){
        margin-top:.2rem;
    }
    .header-wrap header p{
        font-size:.18rem;
        color:rgba(103,103,103,1);
        line-height: .5rem;
        letter-spacing: .02rem;
    }
    .header-wrap header img{
        position: absolute;
        height: .32rem;
        width: .2rem;
        right: 0;
        top: .5rem;
    }
    .btn{
        position:fixed;
        width: 90%;
        left:5%;
        text-align: center;
        height: .73rem;
        line-height: .73rem;
        color:#fff;
        bottom:.74rem;
        background:rgba(245,161,24,1);
        font-size:.25rem;
        letter-spacing: .025rem;
        border-radius: .1rem;
    }
    .Introduction{
        height: 2rem;
        width: 100%;
        border-bottom:.06rem solid rgba(243,243,243,1);
        overflow: hidden;
    }
    .Introduction img{
        float:left;
        height: 1.46rem;
        width: 1.94rem;
        margin:.25rem;
    }
    .Introduction h4{
        color:rgba(0,0,0,1);
        font-size:.23rem;
        margin-top:.4rem;
        letter-spacing: .02rem;
        margin-bottom:.05rem;
    }
    .Introduction p{
        color:rgba(151,151,151,1);
        font-size:.23rem;
        line-height: .4rem;
        letter-spacing: .02rem;
    }
    .money{
        width: 90%;
        margin:0 auto;
    }
    .money p{
        font-size: .22rem;
        color: rgba(44,44,44,1);
        letter-spacing: .02rem;
        line-height: .5rem;
    }
    .money p:nth-child(1){
        margin-top:.2rem;
    }
    .money p span{
        font-size:.33rem;
        color:rgba(245,161,24,1);
    }
</style>
