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

     <van-dialog
             v-model="dialogShow"
             :lazy-render="false"
             :before-close="beforeClose">
           <div class="dialog-content">

           </div>
         <!--<van-field-->
                 <!--v-model="username"-->
                 <!--:label="$t('username')"-->
                 <!--:placeholder="$t('usernamePlaceholder')"-->
         <!--/>-->
         <!--<van-field-->
                 <!--v-model="password"-->
                 <!--type="password"-->
                 <!--:label="$t('password')"-->
                 <!--:placeholder="$t('passwordPlaceholder')"-->
         <!--/>-->
     </van-dialog>
 </div>
</template>

<script>
    export default {
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
                finished: false,
                dialogShow:false,
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
            beforeClose(){

            }

        }
    }
</script>

<style lang="less">
    .recordList{
        .van-cell__label {
            color: #969799;
            font-size: 12px;
            margin-top: 3px;
            line-height: 18px;
            width: 5.15rem;
        }
        .title{
            font-size: 0.24rem;
        }
        .van-cell__label{
            font-size: 0.15rem;
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
        .dialog-content{
            width: 80%;
            height: 30%;
        }

    }
</style>
