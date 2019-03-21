<template>
    <div id="success">
        <common-head :title='title'></common-head>
        <div class="head">
            <img src="http://cdn1.damailicai.com/h5/integral/duihuanchenggong@2x.png" >
            <h3>恭喜您，<span>xxxx</span>已兑换成功</h3>
            <p>请务必确认您的邮寄地址可正常收件</p>
        </div>
        <div class="line">
            <div class="line-back"></div>
        </div>
        <form>
            <div>
                <span>收货人</span>
                <input type="text" placeholder="请输入收货人姓名">
            </div>
            <div>
                <span>手机号码</span>
                <input type="text" placeholder="请输入手机号码">
            </div>
            <div>
                <span>收货地址</span>
                <span>请选择地址</span>
            </div>
            <div class="detail-address">
                <span>详细地址</span>
                <input type="text" placeholder="请输入详细地址">
            </div>
        </form>
        <div class="explain">
            <span class="icon"></span>
            <span>礼品将在 7 个工作日安排寄出</span>
        </div>
        <footer>
            <span class="address">重设地址</span>
            <span class="sure">确定地址</span>
        </footer>
    </div>
</template>

<script>
    import elhead from "../components/common-head"
    export default {
        components:{
            "common-head":elhead
        },
        name: "success",
        data (){
            return {
                title:"确认兑换"
            }
        }
    }
</script>

<style lang="less">
    #success{
        padding-top: 1.28rem;
        .head{
            padding: .5rem 0 0.4rem 0;
            img{
                display: block;
                width: 2.1rem;
                margin: auto;
            }
            h3{
                text-align: center;
                font-size: .3rem;
                color: #212121;
                margin-top: .4rem;
            }
            p{
                font-size: .26rem;
                color: #757575;
                text-align: center;
                margin-top: .2rem;
            }
        }
        .line{
            width: 7.5rem;
            height: .3rem;
            background: #f3f3f3;
            .line-back{
                width: 7.5rem;
                height: .12rem;
                background: url("http://cdn1.damailicai.com/h5/integral/fengexian@1x.png") no-repeat;
                background-size: 100%;
            }
        }
        form{
            font-size: .3rem;
            >div{
                padding: 0 .3rem;
                height: 1rem;
                line-height: 1rem;
                border-bottom: 1px solid #EEEEEE;
                >span:first-child{
                    display: inline-block;
                    width: 1.8rem;
                }
            }
            .detail-address{
                height: 2.1rem; 
            }
        }
        .explain{
            height: .85rem;
            text-align: center;
            font-size: .24rem;
            color: #212121;
            background: #f3f3f3;
            padding-top: .12rem;
        }
        footer{
            height: 1.46rem;
            display: flex;
            justify-content: space-between;
            padding: .3rem;
            font-size: .34rem;
            color: #FFFFFF;
            box-sizing: border-box;
            .address{
                width: 3.3rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                color: #ff9a26;
                border: 1px solid #FF9A26;
                border-radius: 1rem;
            }
            .sure{
                width: 3.3rem;
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                background: #FF9A26;
                border-radius: 1rem;                
            }
        }
    }
</style>
