<template>
 <div class="recordList">
     <van-nav-bar
             title="使用记录"
             left-text=""
             left-arrow
             @click-left="onClickLeft"
     ></van-nav-bar>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
         <div class="van-cell" v-for="item in dataList"  :title="item.name">
             <div class="van-cell__title">
                 <span class="title">{{item.name}}</span>
                 <div class="van-cell__label">{{item.writeOffTime}}
                     <br>订单号：{{item.orderId}}1111
                 </div>
             </div>
             <div class="van-cell__value">
                 <span class="price">{{item.price}}</span><span class="text">抵用券</span>
                 <div v-if="item.evaluateState=='0'" class="go-evaluate" @click="goEvaluate">去评价</div>
                 <div v-if="item.evaluateState=='1'" class="off-evaluate">已评价</div>
             </div>
         </div>
     </van-list>
     <van-popup v-model="dialogShow">
         <div class="dialog-content">
             <div class="shop-name">商户名称</div>
             <star-rate ref="starRate" :value="form.star" />
             <div class="titleRate">商户服务评价</div>
             <textarea class="rate-textarea" rows="3" maxlength="151" v-model="form.desc"></textarea>
             <div class="rate-submit" @click="submitRate">
                 <span>提交</span>
             </div>
         </div>
     </van-popup>
 </div>
</template>

<script>
    import starRate from '../../components/starsRate'
    export default {
        components:{
            'star-rate':starRate
        },
        data() {
            return {
                dataList: [
                    {
                        name: "洗车",
                        orderId: "2019331544554545",
                        price: "50",
                        writeOffTime: "2019-03-06 09:47:40",
                        evaluateState:'0'
                    },
                    {
                        name: "洗车",
                        orderId: "2019331544554545",
                        price: "50",
                        writeOffTime: "2019-03-06 09:47:40",
                        evaluateState:'1'
                    },
                ],
                loading: false,
                finished: true,
                dialogShow:false,
                form: {
                    action:"",	//是	string	smGoodsEvaluation
                    goodsId:"",	//是	int	服务id
                    star:"",	//否	string	评价星级
                    desc:"",//	否	string	评价内容
                    orderId:"",	//否	bigint	订单id
                }
            }
        },
        watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
            form:{
                handler:function(old){
                    let _this = this;
                    if (_this.form.desc.length=="151"){
                        this.$notify('商户服务评价字数超出限制');
                        _this.form.sogoName=old.sogoName.substr(0, 150);
                    }
                },
                deep:true
            }
        },
        methods:{
            onClickLeft(){
                this.$router.push({path:'/'})
            },
            onLoad(){

            },
            goEvaluate(){
                this.dialogShow=true;
            },
            submitRate(){
                this.dialogShow=false;
            }


        }
    }
</script>

<style lang="less">
    .recordList{
        .van-cell__label {
            width: 5.6rem;
        }
        .title{
            font-size: 0.24rem;
        }
        .price{
            color: rgba(245,161,24,1);
            font-size: 0.24rem;
        }
        .text{
            color: rgba(245,161,24,1);
            font-size: 0.15rem;
        }
        .go-evaluate{
         font-size: 0.18rem;
            color: rgba(3,171,19,1);
        }
        .off-evaluate{
            font-size: 0.18rem;
            color: rgba(103,103,103,1);
        }
        .van-popup {
            border-radius: 0.1rem;
        }
        .dialog-content{
            width:5.93rem;
            padding: 5%;
            text-align: center;
            height: 5.07rem;
            font-size: 0.24rem;
            line-height: 0.64rem;
            .shop-name{

            }
            .rate-textarea{
                width: 5.12rem;
                font-size: 0.3rem;
            }
            .titleRate{
                color: rgba(103,103,103,1);
                font-size: 0.24rem;
            }
            .rate-submit{
                width:3.33rem ;
                height: 0.73rem;
                background-color: rgba(245,161,24,1);
                text-align: center;
                border-radius: 0.1rem;
                margin: 0 auto;
                line-height:  0.73rem;;
                span{
                    color: white;
                }
            }
        }

    }
</style>
