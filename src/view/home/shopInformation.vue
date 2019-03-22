<template>
<div>
    <!--头部-->
    <van-nav-bar
            title="商铺详情"
            left-text=""
            left-arrow
            @click-left="onClickLeft"
    />
    <!--banner-->
    <div class="banner">
        <img src="../../assets/img/shop_1.png"/>
    </div>
    <!--名称-->
    <div class="name">
        <h4>{{name}}<span>{{from}}</span></h4>
        <p>{{room}}<img class="img1" src="../../assets/img/shop_2.png"/></p>
        <p>{{service}}</p>
        <p>服务电话:{{phone}}<img class="img2" src="../../assets/img/shop_3.png"/></p>
        <p>营业时间:{{time}}</p>
    </div>
    <!--列表-->
    <ul class="list">
        <li v-for="item in items">
            <div class="content">
                <div class="left">
                    <img src="../../assets/img/shop_4.png"/>
                </div>
                <div class="right">
                    <h3>{{item.title}}</h3>
                    <span>{{item.instruction}}</span>
                    <div>现价:<i>￥{{item.money}} + </i><p>{{item.price}}<span>抵用券</span></p></div>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>
<style scoped>
    .banner{
        width: 100%;
        height: 4.74rem;
    }
    .banner img{
        height: 100%;
        width: 100%;
    }
    .name{
        width: 95%;
        margin:0 auto;
    }
    .name h4{
        font-size: .27rem;
        margin-top: .2rem;
        letter-spacing: .02rem;
        color:rgba(44,44,44,1);
        margin-bottom:.1rem;
    }
    .name h4 span{
        float:right;
        color:rgba(103,103,103,1);
    }
    .name p{
        font-size:.26rem;
        color:rgba(103,103,103,1);
        line-height: .45rem;
    }
    .name p .img1{
        height: .28rem;
        width: .24rem;
        margin-left: .1rem;
    }
    .name p .img2{
        height: .2rem;
        width: .22rem;
        margin-left: .1rem;
    }
    .list{
        width: 100%;
        margin-top:.1rem;
        border-top:.06rem solid rgba(243,243,243,1);
    }
    .list li{
        width: 100%;
        height: 1.95rem;
        border-bottom:.03rem solid rgba(243,243,243,1);
    }
    .list li .content{
        width: 95%;
        margin:0 auto;
    }
    .list li .content .left{
        width: 1.94rem;
        height: 1.46rem;
        margin:.25rem;
        float:left;
    }
    .list li .content .left img{
        height: 100%;
        width: 100%;
    }
    .list li .content .right{
        float:left;
    }
    .list li .content .right h3{
        font-size: .3rem;
        color: rgba(0,0,0,1);
        margin-top: .3rem;
        letter-spacing: .02rem;
    }
    .list li .content .right span{
        color:rgba(151,151,151,1);
        font-size:.24rem;
        display: block;
        margin-top:.15rem;
    }
    .list li .content .right div{
        font-size: .26rem;
        color: rgba(103,103,103,1);
        margin-top: .1rem;
    }
    .list li .content .right div i{
        color: rgba(245,161,24,1);
        font-style: normal;
        font-size: .3rem;
        font-weight: 900;
    }
    .list li .content .right div p{
        display: inline-block;
        height: .45rem;
        width: 1.57rem;
        text-align: center;
        line-height: .17rem;
        color: #fff;
        background: rgba(245,161,24,1);
        font-size:.32rem;
    }
    .list li .content .right div p span{
        display: inline-block;
        color:#fff;
    }
</style>
<script>
    export default {
        data() {
            return {
                name:'汽车服务商名称1',
                from:'1.1km',
                room:'浦东新区世纪大道1600号',
                service:'汽车保养/美容/洗车',
                phone:'40012345678',
                time:'周一至周六 09:00-22:00',
                items:[
                    {
                    title:'爱车小保养',
                    instruction:'更换三滤，空调系统检测',
                    money:'450',
                    price:'100'
                    },{
                        title:'爱车小保养',
                        instruction:'更换三滤，空调系统检测',
                        money:'450',
                        price:'100'
                    }
                ]
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
        }
    }
</script>
