// 公共头部组件
<template>
  <div id="head">
    <header>
      <div class="mall">商城</div>
      <div class="search">
        <img src="../assets/img/1.png"/>
        <input type="search" placeholder="输入商户名称">
      </div>
      <van-collapse v-model="activeNames" style="width: 100px;position: absolute;    margin-left: 89%;">
        <van-collapse-item name="1">
          <img slot="right-icon"  src="../assets/img/menu.png"  class="menuSelect" >
          <div>购买优惠券</div>
          <div>我的优惠券</div>
          <div>我的订单</div>
          <div>地址管理</div>
        </van-collapse-item>
      </van-collapse>
      <div>
      </div>
    </header>
    <van-cell  >
      <img slot="icon" src="../assets/img/home/Location.png" class="location-icon" />
      <span slot="title" class="location-title">
        陆家嘴商务广场
      <img src="../assets/img/home/rightArrow.png" class="location-right-icon" /></span>
    </van-cell>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"common-head",
  data() {
    return {
      menuShow:false,
      activeNames:[1],
    }
  },
  methods:{
    right(){
          var t=this;
			t.$emit("right-click");
    },
    //返回按钮
    ret:function(){
      var t=this;
      window.history.length > 1? t.$router.go(-1): t.$router.push('/');
    },
    //菜单按钮状态
    setMenuStatus(){
        this.menuShow = !this.menuShow;
    }
  }
}
</script>
<style lang="less">
 #head{
   height: 1.6rem;
   background-color: white;

 }
 header{
   width: 95%;
   padding: 0.2rem;
   height:.64rem;
   display: flex;
   justify-content: space-between;
 }
 header .mall{
   font-size:.3rem;
   color:rgba(44,44,44,1);
   line-height: .64rem;
 }
 header .search{
   height:100%;
   width:5.38rem;
   background:rgba(232,230,230,1);
   position:relative;
   border-radius: 8px;
 }
 header .search img{
   float:left;
   height:.3rem;
   width: .3rem;
   margin:.17rem 0 0 .2rem;
 }
 header .search input{
   border: 0;
   background: #e8e6e6;
   margin: .17rem 0 0 .2rem;
   letter-spacing: .02rem;
   float: left;
   height: .3rem;
   width: 4rem;
   font-size: 16px;
 }
 header .search input::-webkit-input-placeholder{
   color: #ADD8E6;
 }
 header .search input::-webkit-input-placeholder {
   color: rgba(156,156,156,1);
   font-size: .24rem;
 }
 header .menuSelect{
   width: .48rem;
   height: .36rem;
   margin-top:.14rem;
 }
 .menuSelect{
   width: .48rem;
   height: .36rem;
   margin-top:.14rem;
 }
 .van-popup--right {
   top: 19%;
   right: 12px;
   bottom: auto;
   left: auto;
   -webkit-transform: translate3d(0, -50%, 0);
   transform: translate3d(0, -50%, 0);
   border: 1px solid #e8e6e6;
 }
 .van-cell {
   width: 100%;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   padding: 0 0 0 0.2rem;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   line-height: 24px;
   position: relative;
   background-color: #fff;
   color: #323233;
   font-size: 14px;
   overflow: hidden;
 }
  .location-icon{
    width: 12px;
    height: 12px;
    margin-top: 6px;
  }
  .location-right-icon{
    width: 8px;
    height: 8px;
    margin-top: 2px;
  }
  .location-title{
    margin-left: 4px;
  }
 .van-collapse-item__content {
   color: #ffffff;
   padding: 10px;
   font-size: 13px;
   line-height: 2;
   background-color: #212121
 }
 .van-collapse-item__wrapper {
   text-align: center;
   overflow: hidden;
   will-change: height;
   -webkit-transition: height 0.3s ease-in-out;
   -o-transition: height 0.3s ease-in-out;
   transition: height 0.3s ease-in-out;
   float: right;
   margin-right: 100px;
   width: 100px;
   background-color: rebeccapurple;
   position: absolute;
   z-index: 999;
   margin-left: -80px
 }
  .van-collapse-item {
    .van-cell {

      padding: 0 0 0 0;

    }
  }
</style>
