// 公共头部组件
<template>
  <div id="head">
    <header>
      <div class="mall">商城</div>
      <div class="search">
        <img src="../assets/img/1.png"/>
        <input type="text" placeholder="输入商户名称">
      </div>
      <div class="menu">
        <img src="../assets/img/2.png"/>
      </div>
    </header>
  </div>
</template>

<script type="text/javascript">
export default {
  name:"common-head",
  data() {
    return {

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
  }
}
</script>
<style lang="less">
 #head{
   height: .9rem;
 }
 header{
   width: 95%;
   margin:.2rem auto 0;
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
   border:0;
   background:rgba(232,230,230,1);
   margin:.17rem 0 0 .2rem;
   letter-spacing: .02rem;
 }
 header .search input::-webkit-input-placeholder {
   color: rgba(156,156,156,1);
   font-size: .24rem;
 }
 header .menu{
   width: .48rem;
   height: .36rem;
   margin-top:.14rem;
 }
 header .menu img{
   height: 100%;
   width: 100%;
 }
</style>
