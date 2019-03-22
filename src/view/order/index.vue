<template>
    <div class="order">
        <!--头部-->
        <van-nav-bar
                title="我的订单"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        <!--选项卡-->
        <div class="box">
            <div class="tab-hd">
                <a href="javascript:;" :class="{'now':index==1}" @click="index=1">全部</a>
                <a href="javascript:;" :class="{'now':index==2}" @click="index=2">寄件中</a>
                <a href="javascript:;" :class="{'now':index==3}" @click="index=3">已完成</a>
            </div>
            <div class="tab-bd">
                <!--全部-->
                <div class="tab-item" v-show="index==1">
                    <ul>
                        <li v-for="item in items">
                            <img :src="item.url" />
                            <h3>{{item.title}}</h3>
                            <p>购买总额：￥{{item.money}}</p>
                            <p>订单号：{{item.code}}</p>
                            <div>签收订单</div>
                        </li>
                    </ul>
                </div>
                <!--寄件中-->
                <div class="tab-item" v-show="index==2">
                    <ul>
                        <li v-for="item in items">
                            <img :src="item.url" />
                            <h3>{{item.title}}</h3>
                            <p>购买总额：￥{{item.money}}</p>
                            <p>订单号：{{item.code}}</p>
                            <div>签收订单</div>
                        </li>
                    </ul>
                </div>
                <!--已完成-->
                <div class="tab-item" v-show="index==3">
                    <ul>
                        <li v-for="item in items">
                            <img :src="item.url" />
                            <h3>{{item.title}}</h3>
                            <p>购买总额：￥{{item.money}}</p>
                            <p>订单号：{{item.code}}</p>
                            <div>签收订单</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                index : 1,
                items:[
                    {
                        url:'../..assets/img/5.png',
                        title:'汽车风口香薰x2',
                        money:'80',
                        code:'：387246382746338724664'
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

<style scoped>
    .tab-hd {
        position: relative;
        height: .55rem;
        margin:15px 0;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 75%;
    }
    .tab-hd a {
        float:left;
        padding:8px 20px;
        margin-right:-1px;
        font-size:.24rem;
        color:rgba(103,103,103,1);
    }
    .tab-hd .now {
        padding: 8px 20px 7px;
        border-bottom:.05rem solid rgba(243,160,47,1);
        background: #fff;
        z-index: 2;
        color:#000;
    }
    .box .tab-bd{
        margin-top:.3rem;
    }
    .box .tab-bd .tab-item ul{
    width: 100%;
    }
    .box .tab-bd .tab-item ul li{
    width: 100%;
    border-bottom:.12rem solid rgba(243,243,243,1);
    overflow: hidden;
    position:relative;
    }
    .box .tab-bd .tab-item ul li .content{
    width: 90%;
    margin:0 auto;
    height: 2rem;
    }
    .box .tab-bd .tab-item ul li  img{
    height: 1.46rem;
    width: 1.94rem;
    float:left;
    margin:.2rem;
    }
    .box .tab-bd .tab-item ul li  h3{
    color:rgba(0,0,0,1);
    font-size:.23rem;
    margin-top:.3rem;
    margin-bottom: .1rem;
    }
    .box .tab-bd .tab-item ul li p{
        color:rgba(103,103,103,1);
        font-size:.24rem;
        line-height: .5rem;
    }
    .box .tab-bd .tab-item ul li div{
        position: absolute;
        height: .36rem;
        width: 1.08rem;
        text-align: center;
        line-height: .36rem;
        background: #1FCE03;
        color: #fff;
        font-size: .2rem;
        right: .28rem;
        top: .35rem;
        border-radius: .05rem;
    }
    [class*=van-hairline]::after{
        border:0!important;
    }
</style>
