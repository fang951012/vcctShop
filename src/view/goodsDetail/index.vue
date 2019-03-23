<template>
    <div id="detail">
        <!--头部-->
        <van-nav-bar
                title="商品详情"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        <!--banner-->
        <div class="banner"><img :src="img" /></div>
        <!--详情-->
        <div class="detail-wrap">
            <div class="detail">
                <h3>{{title}}</h3>
                <p>规格型号：{{color}}</p>
                <div class="price">原价：¥{{price}}元<span>剩余：{{num}}件</span></div>
                <p>现价：<span>¥{{money}}元</span></p>
                <p>购买数量(限购{{number}}件/人)</p>
                <div class="complate">
                    <span>
                        <a href="#" @click="proNum>0?proNum--:''">
                            <img src="../../assets/img/shop_13.png"/>
                        </a>
                    </span>
                    <strong>{{proNum}}</strong>
                    <span>
                        <a href="#" @click="proNum++">
                            <img src="../../assets/img/shop_14.png"/>
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <!--商品简介-->
        <van-tabs color="#F3A02F" swipeable>
            <van-tab title="商品简介">
                <div class="introduction">
                    <h3>服务内容：</h3>
                    <p>{{content}}</p>
                </div>
            </van-tab>
            <van-tab title="购买须知">
                22
            </van-tab>
        </van-tabs>
        <footer>
            <p>¥{{proNum*money}}</p>
            <button>立即购买</button>
        </footer>
    </div>
</template>
<style scoped>
    .banner{
        width: 100%;
        height: 4.73rem;
    }
    .banner img{
        height: 100%;
        width: 100%;
    }
    .detail-wrap{
        width: 100%;
        border-bottom:.06rem solid rgba(243,243,243,1);
        height: 2.35rem;
    }
    .detail-wrap .detail{
        height: 100%;
        width: 90%;
        margin:0 auto;
        position:relative;
    }
    .detail-wrap .detail h3{
        font-size: .24rem;
        color: rgba(44,44,44,1);
        line-height: .4rem;
        margin-top: .15rem;
        letter-spacing: .02rem;
    }
    .detail-wrap .detail p{
        font-size: .24rem;
        color: rgba(103,103,103,1);
        line-height: .45rem;
        letter-spacing: .02rem;
    }
    .detail-wrap .detail .price{
        font-size: .24rem;
        color: rgba(103,103,103,1);
        text-decoration: line-through;
        letter-spacing: .02rem;
        line-height: .4rem;
    }
    .detail-wrap .detail .price span{
        float:right;
        text-decoration:none;
    }
    .detail-wrap .detail p span{
        font-size:.26rem;
        color:rgba(245,161,24,1);
    }
    .detail-wrap .detail .complate{
        position:absolute;
        right: 0;
        top: 1.7rem;
        height: .3rem;
    }
    .detail-wrap .detail .complate span{
        font-size:.3rem;
        float:left;
    }
    .detail-wrap .detail .complate span img{
        height: .19rem;
        width: .12rem;
    }
    .introduction{
        width: 90%;
        margin:0 auto;
    }
    .introduction h3{
        color:rgba(44,44,44,1);
        font-size:.24rem;
        margin-top: .3rem;
        letter-spacing: .02rem;
    }
    .introduction p{
        font-size:.24rem;
        color:rgba(103,103,103,1);
        letter-spacing: .02rem;
        line-height: .3rem;
        margin-top: .1rem;
    }
    .van-tab span{
        font-size:.25rem;
    }
    footer{
        position: fixed;
        bottom: .23rem;
        width: 90%;
        left: 5%;
    }
    footer p{
        font-size:.29rem;
        color:rgba(245,161,24,1);
        float:left;
        line-height: .73rem;
    }
    footer button{
        float:right;
        text-align: center;
        height: .73rem;
        line-height: .73rem;
        width: 3.3rem;
        color:#fff;
        background:rgba(245,161,24,1);
        font-size:.25rem;
        letter-spacing: .025rem;
        border-radius: .1rem;
    }
    strong{
        font-size: .2rem;
        color: rgba(44,44,44,1);
        float: left;
        margin: .05rem .2rem;
    }
</style>
<script type="text/javascript">
    import common1 from "../../assets/img/shop_12.png"
    export default {
        data() {
            return {
                img:common1,
                title:'汽车风口香薰',//标题
                color:'银色',//规格型号
                price:'550',//原价
                proNum:1,//数量
                num:'999',//剩余件数
                money:'40',//现价
                number:10,//限购
                content:'啊顺德区和健康还欠我而获取接口男子离开卢卡斯鹿鼎记里的啊顺德区和健康还欠我而获取接口男子离开卢卡斯鹿鼎记里的',//服务内容
                total:40,//总价

            }
        },
        methods:{
            onClickLeft() {
                Toast('');
            },
        }
    }
</script>
