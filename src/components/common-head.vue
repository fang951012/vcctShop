// 公共头部组件
<template>
  <div id="head">
    <header>
      <div class="mall">商城</div>
      <div class="search">
        <img src="../assets/img/1.png"/>
        <input type="search" placeholder="输入商户名称">
      </div>
      <img src="../assets/img/menu.png" class="menuSelect" @click="setMenuStatus"/>
      <van-popup v-model="menuShow" position="right" :overlay="false">
          <van-cell title="购买优惠券"  url="#" />
          <van-cell title="我的优惠券"  url="#" />
          <van-cell title="我的订单"  url="#" />
          <van-cell title="地址管理" url="#" />
      </van-popup>
      <div>
        <!--<van-cell title="单元格" icon="location-o" />-->
      </div>

    </header>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"common-head",
  data() {
    return {
      menuShow:false,
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
   height: .9rem;
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
 .van-popup--right {
   top: 19%;
   right: 12px;
   bottom: auto;
   left: auto;
   -webkit-transform: translate3d(0, -50%, 0);
   transform: translate3d(0, -50%, 0);
   border: 1px solid #e8e6e6;
 }
</style>
