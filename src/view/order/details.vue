<template>
    <div class="orderDetail">
        <!--头部-->
        <van-nav-bar
                title="订单详情"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        <!--图片详情-->
        <div class="header-wrap">
            <header>
                <img class="img1" src="../../assets/img/shop_5.png"/>
                <h3>{{name}}</h3>
                <p>规格型号:{{model}}</p>
                <p>单价:￥{{price}}元</p>
                <img class="img2" src="../../assets/img/shop_6.png"/>
            </header>
        </div>
        <!--购买-->
        <div class="buy">
            <p>购买数量： {{num}}</p>
            <p>购买总额： <span>￥{{money}}</span></p>
        </div>
        <!--收货列表-->
        <ul>
            <li><h3>收货人： {{takeGoods}}</h3></li>
            <li><h3>手机号： {{phone}}</h3></li>
            <li>地址： {{room}}</li>
            <li>下单时间： {{time}}</li>
            <li>订单号： {{code}}</li>
            <li>快递公司： {{company}}</li>
            <li>运单号： {{waybill}}</li>
        </ul>
    </div>
</template>
<style scoped>
    .header-wrap{
        width: 100%;
        height: 1.8rem;
    }
    .header-wrap header{
        width: 90%;
        margin:0 auto;
        position:relative;
        overflow: hidden;
    }
    .header-wrap header .img1{
        height: 1.46rem;
        width: 1.94rem;
        margin-top:.2rem;
        float:left;
        margin-right:.3rem;
    }
    .header-wrap header h3{
        font-size:.23rem;
        color:rgba(0,0,0,1);
        margin-top:.3rem;
        margin-bottom:.1rem;
        letter-spacing: .02rem;
    }
    .header-wrap header p{
        font-size: .23rem;
        color: rgba(151,151,151,1);
        line-height: .4rem;
        letter-spacing: .02rem;
    }
    .header-wrap header .img2{
        position:absolute;
        height: 1.1rem;
        width: 1.25rem;
        right:0;
        top:.3rem;
    }
    .buy{
        width: 100%;
        height: 1.2rem;
        border-top:.06rem solid rgba(243,243,243,1);
        border-bottom:.06rem solid rgba(243,243,243,1);
    }
    .buy p{
        font-size:.25rem;
        line-height: .5rem;
        color:rgba(44,44,44,1);
        margin-left:.29rem;
        letter-spacing: .02rem;
    }
    .buy p:nth-child(1){
        margin-top:.1rem;
    }
    .buy p span{
        color: rgba(245,161,24,1);
        font-size: .33rem;
        font-weight: 900;
    }
    ul li{
        width: 90%;
        margin:0 auto;
        font-size:.22rem;
        color:rgba(103,103,103,1);
        line-height: .5rem;
        letter-spacing: .02rem;
    }
    ul li h3{
        color:rgba(44,44,44,1);
        font-weight: 600;
    }
    ul li:nth-child(1) h3{
        margin-top:.1rem;
    }
</style>
<script>
    export default {
        data() {
            return {
                name:'汽车风口香薰',
                model:'银色',
                price:'40',
                num:'2',
                money:'80',
                takeGoods:'王小毛',
                phone:'18918523066',
                room:'上海市普陀区古浪路555弄祁连家园222号1109室',
                time:'2019-02-28 09:32',
                code:'387246382746338724664',
                company:'顺丰',
                waybill:'sf98246798',
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
        }
    }
</script>
