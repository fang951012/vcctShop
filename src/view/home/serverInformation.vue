<template>
    <div class="GoodsInformation">
        <van-nav-bar
                title="商品详情"
                left-arrow
                fixed
                @click-left="onClickLeft">
        </van-nav-bar>
        <div class="van-panel__content" >
            <div class="goods_brief">
                <div class="van-cell__title" >{{form.title}}</div>
                <div class="van-cell__label">
                    {{form.goods_brief}}
                    <br>
                    <span class="original_price">原价: ￥{{form.original_price}}</span>
                    <br>
                    现价:<span class="seller_price">￥{{form.seller_price }}元+<span class="coupon_price">{{form.coupon_price}}抵用券</span></span>
                </div>
            </div>
            <div class="goods_desc">
                <div class="van-cell__title">服务内容:</div>
                <div class="van-cell__label">
                    {{form.goods_desc}}
                </div>
            </div>
            <img  class="banner_img" :src="form.banner_img"  alt=""  />

        </div>


    </div>
</template>

<script>
    import common1 from "../../assets/img/home/1.png"
    export default {
        data () {
            return {
                form:  {
                    serveId: "1",
                    title: "11",
                    original_price: "222",
                    coupon_price: "50",
                    seller_price: "172",
                    banner_img: common1,
                    goods_desc: "2221111223200",
                    goods_brief: "11111111112222111112232"
                },
                bannerImgUrl:[],
            }
        },
        methods:{
            onClickLeft(){
                this.$router.push({path:'/'})
            },
        }
    }
</script>
<style lang="less">
    .GoodsInformation{
        height: 100%;
        background-color: white;
        position: absolute;
        width: 100%;
        overflow: scroll;
        .goods_brief{
            .van-cell__title{
                font-size: 0.24rem;
            }
            .van-cell__label {
                color: #969799;
                font-size: 0.23rem;
                margin-top: 3px;
                line-height: 0.36rem;
            }

        }
    }
    .van-panel__content{
        padding: 0 15px 15px 15px;
        font-size: 12px;
        color: rgba(103,103,103,1);
        text-align: justify;
        margin-top: 52px;
        word-wrap: break-word;
    }
    .original_price{
        text-decoration:line-through
    }
    .banner_img{
        width: 100%;
        margin-top: 4px;
    }
    .goods_desc{
        margin-top: 0.56rem;
        .van-cell__title{
            font-size: 0.26rem;
        }
        .van-cell__label {
            color: #969799;
            font-size: 0.23rem;
            margin-top: 3px;
            line-height: 0.36rem;
        }
    }
    .seller_price{
        color: #F5A118;
        font-weight: 500;
    }
    .van-nav-bar .van-icon {
        color: rgba(44, 44, 44, 1);
    }
    .van-cell__title {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: medium;
        color: black;
    }
    .coupon_price{
        background-color: #F5A118;
        color: white;
        padding: 0 6px 0 6px;
    }
</style>
