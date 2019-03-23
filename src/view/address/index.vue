<template>
    <div>
        <van-nav-bar
                title="地址管理"
                left-text=""
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="shoppingCart">
            <div class="main">
                <ul class="list">
                    <li v-for="(item,index) in listData" @click.capture="mp(index,$event)" :key="index">
                        <div v-if="item.id==index" class="item-text"></div>
                        <div v-else class="item-text">
                            <p>收货人:{{item.name}}</p>
                            <p><span class="item-jg">手机号:{{item.phone}}</span></p>
                            <p><span class="item-jg">地址:{{item.city}}</span></p>
                            <p>
                                <span @click="sel(index)" item.id><img ref="id" :src="item.img" />设为默认 </span>
                                <span style="float:right;margin-right:.2rem" @click="del(index)"><img src="../../assets/img/shop_7.png"/>删除 </span>
                                <span style="float:right" class="edit"><img src="../../assets/img/shop_8.png"/>编辑</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <button class="btn">新建地址</button>
    </div>
</template>
<script>
    import common1 from "../../assets/img/shop_9.png"
    import common2 from "../../assets/img/shop_10.png"
    export default {
        data() {
            return {
                listData: [
                    {
                        id:1,
                        name: '王小毛1',   //名字
                        phone: 13909187198,      //手机号
                        city:'地址：上海市普陀区古浪路555弄祁连家园222号1109室',
                        img:common1,
                    },
                    {
                        id:2,
                        name: '王小毛2',   //名字
                        phone: 13909187198,      //手机号
                        city:'地址：上海市普陀区古浪路555弄祁连家园222号1109室',
                        img:common2,
                    },
                    {
                        id:3,
                        name: '王小毛3',   //名字
                        phone: 13909187198,      //手机号
                        city:'地址：上海市普陀区古浪路555弄祁连家园222号1109室',
                        img:common2,
                    }
                ]
            }
        },
        methods: {
            onClickLeft() {
                Toast('');
            },
            mp(dpIndex,e){
                this.Index = dpIndex;
            },
            // 删除
            del(index){
                console.log(index);
                this.listData[index].splice(index,1);
            },
            sel(index){
                let list = this.listData[index];
                console.log(this.listData.id);

                console.log(list);
                 list.img = common1;
            },
        }
    }
</script>
<style scoped>
    .list {
        list-style-type: none;
    }

    .list li {
        width: 100%;
    }
    .list-dp {
        width: 100%;
        background: #fff;
        line-height: 0.8rem;
        font-size: 18px;
        color: #666;
        margin: 0 auto;
        margin-top: 0.2rem
    }

    .dp {
        margin-left: 5%;
        line-height: 0.8rem;
        font-size: 14px;
    }

    .item {
        width: 100%;
        height: 2rem;
        display: flex;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        border-bottom: .03rem solid rgba(243,243,243,1);
    }

    .item-img img {
        width: 100%;
    }

    .item-text {
        height: 2rem;
        width: 95%;
        margin-left: 3%;
        margin-top: 0.2rem;
        overflow: hidden;
    }

    .item-text p:nth-child(1) {
        color: #666;
        font-size: 12px;/*padding: 10px;*/
    }

    .item-text p:nth-child(2) {
        color: #999;
        font-size: 12px;
        padding-top: 0.1rem;
    }
    .item-text p:nth-child(3) {
        color: #999;
        font-size: 12px;
        padding-top: 0.1rem;
    }
    .item-text p:nth-child(4) {
        color: #999;
        font-size: 12px;
        padding-top: 0.3rem;
    }
    .item-text p:nth-child(5) {
        color: #999;
        font-size: 12px;
        padding-top: 0.1rem;
    }


    .edit {
        color: #999;
        font-size: 12px;
        float: right;
        margin-right: 5%;
    }

    .amount span {
        font-size: 20px;
        width: 20%;
        height: 0.5rem;
        display: inline-block;
        text-align: center;
        border: 1px solid #666;
        border-radius: 5px;
        line-height: 0.5rem;
    }

    .amount input {
        display: inline-block;
        width: 50%;
        height: 0.5rem;
    }

    img {
        border: 0;
        height: .32rem;
        float: left;
        margin-right: .1rem;
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
</style>
