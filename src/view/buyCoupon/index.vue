<template>
    <div>
        <!--头部-->
        <van-nav-bar
                title="购买优惠券"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <div slot="right" class="icon"><img src="../../assets/img/shop_23.png"/> </div>
        </van-nav-bar>
        <!--购物券列表-->
        <ul>
            <li v-for="item in items">
                <img :src="item.img"/>
                <p>{{item.type}}</p>
                <div class="number">¥<span>{{item.number}}</span></div>
                <div class="btn">点击购买</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import common from "../../assets/img/shop_21.png"
    import common2 from "../../assets/img/shop_22.png"
    export default {
        data(){
            return{
                items:[
                    {
                        img:common,
                        type:'通用券',
                        number:100
                    },{
                        img:common,
                        type:'通用券',
                        number:100
                    },{
                        img:common,
                        type:'通用券',
                        number:100
                    },{
                        img:common,
                        type:'通用券',
                        number:100
                    },{
                        img:common,
                        type:'通用券',
                        number:100
                    }
                ]
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
            onClickRight() {
                Toast('');
            }
        }
    }
</script>

<style scoped>
    ul{
        width: 100%;
        margin:.3rem auto;
    }
    ul li{
        height: 2.43rem;
        width: 2.13rem;
        float: left;
        position: relative;
        margin-left: 3.5%;
        margin-bottom: .3rem;
    }
    ul li img{
        height: 100%;
        width: 100%;
    }
    ul li p {
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: .22rem;
        margin-top: .3rem;
    }
    ul li .number{
        font-size:.24rem;
        width: 100%;
        text-align: center;
        color:#fff;
        position:absolute;
        top:.65rem;
    }
    ul li .number span{
        font-size:.68rem;
    }
    ul li .btn{
        font-size: .17rem;
        color: #fff;
        position: absolute;
        width: 100%;
        bottom: .2rem;
        text-align: center;
    }
    .icon{
        height: .32rem;
        width: .32rem;
    }
    .icon img{
        height: 100%;
        width: 100%;
        float:left;
    }
    .van-nav-bar__right{
        right: 15px;
        bottom: .25rem;
    }
</style>



















