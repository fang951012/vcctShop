<template>
  <div id="in-history">
    <common v-if="!isApp" :title="title" :rightTitle="rightTitle" @right-click="rightClick"></common>
    <nav :class="['nav',{'top':isApp}]">
      <ul class="type">
        <li :class="{'active':type=='all'}" @click="changeActive('all')">全部</li>
        <li :class="{'active':type=='in'}" @click="changeActive('in')" >获取记录</li>
        <li :class="{'active':type=='out'}" @click="changeActive('out')">消耗记录</li>
      </ul>
    </nav>
    <div class="tab">
      <div class="num-head all" v-show="type=='all'">
        <p class="mark">—— 可用积分：<span v-text="virtual_money"></span> ——</p>
        <p><span v-text="left">0</span>积分将于<span v-text="$options.filters.format_date(next_year,'YYYY-MM-DD')"></span>过期，及时用掉别浪费</p>
      </div>
      <div class="num-head obtain" v-show="type=='in'">
        <div>—— <span>已获取积分：</span><span v-text="count"></span> ——</div>
      </div>
      <div class="num-head consume" v-show="type=='out'">
        <div>—— <span>已消耗积分：</span><span v-text="count"></span> ——</div>
      </div>
    </div>
    <div class="list-box">
      <ul>
        <li v-for="(list,key) in lists">
          <div class="detail">
            <p v-text="list.remark"></p>
            <p v-text="$options.filters.format_timestamp(list.addtime,'YYYY-MM-DD HH:mm:ss')" class="time"></p>
          </div>
          <div>
            <p class="add" v-if="list.extcredits>0" v-text="'+'+list.extcredits"></p>
            <p class="reduce" v-else v-text="list.extcredits"></p>
          </div>
        </li>
      </ul>
      <div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="4">
        <span v-show="loadingShow" v-text="loadingText"></span>
      </div>
    </div>
    <login v-show="showLogin" @close-login='closeLogin' @login-success="loginSuccess"></login>
    <input type="hidden" name="starttime" :value="$moment('20181205').format('YYYY-MM-DD HH:mm:ss')">
  </div>
</template>

<script>
import common from "../components/common-head.vue"
import login from "../components/login.vue"
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
import moment from 'moment'
export default {
  name:'integral-history',
  components:{
    'common':common,
    'login':login
  },
  data() {
    return {
      title:"我的积分",
      rightTitle:"积分规则",
      isApp:false,
      isLogin:true,//是否登录
      showLogin:false,//是否显示登录框
      csrf:"",
      lists:[],//积分记录
      virtual_money:0,//可用积分
      left:0,
      next_year: '1970-01-01',
      count:0,//获取积分或者消耗积分,type不同对应的意义不同
      type:"all",//tab切换
      page:0,//加载更多的当前页码
      total:0,
      busy: false,
      loadingShow: true,
      loadMoreHide:false,
      loadingText:'加载中...'
    }
  },
  created(){
    var t = this
    t.judgeApp()
    t.login()
    t.loadMore()
  },
  methods:{
    judgeApp(){
      var t = this
      var ua = navigator.userAgent
      var iPhone = ua.indexOf('iPhone') != -1
      if(ua.indexOf("damailicai_app") != -1){
        t.isApp=true
        if(iPhone) {
          var param = {
            showBack: true,
            title: '我的积分',
            right: '积分规则'
          }
          try {
            JIClient.appSetHead(param)
          } catch(err) {};
        } else {
          try {
            JIClient.appSetHead(true, '我的积分', '积分规则')
          } catch(err) {}
        }
        window.appRight=t.appRight
      }else{
        t.isApp=false
      }
    },
    appRight(){
      var t=this
      if(t.isLogin){
        window.location.href="/shop/index#/rule"
      }else{
        t.goLogin()
      }
    },
    rightClick(){
      var t=this;
      t.$router.push('/rule');
      _hmt.push(['_trackEvent', '积分规则', 'click', 'dhlb-jfgz']);
    },
    //去登陆
    goLogin(){
      var t=this;
      var ua = navigator.userAgent;
      if(ua.indexOf("damailicai_app") != -1){
        var version = ua.split('damailicai_app/')[1].split(';')[0];
        if(version < '3.2.0'){
          if(ua.indexOf('iPhone') != -1){
            quicklogin(url)
          }else{
            try{JIClient.appClose();JIClient.appLogin();}catch(err){};
          }
        }else{
          try{JIClient.appLogin();}catch(err){};
        }
        return false;
      }
      t.showLogin=true;
    },

    //登录
    login(){
      var t=this;
      t.getCsrf();
      t.$http.post('/shop/is-login',{},{
        headers: {
          'X-CSRF-Token': t.csrf,
        }
      }).then(function(res){
        var res=res.data;
        if(res.statusCode==0){
          t.isLogin=true;
        }else{
          t.isLogin=false
          t.showLogin=true;
        }
      }).catch(function(err){
        MessageBox({
          title: '温馨提示',
          message: '系统繁忙，请稍后再试！'
        })
      })
    },
    //登录成功
    loginSuccess(){
      var t=this;
      t.showLogin=false
      t.isLogin=true
      t.loadMore()
    },
    closeLogin(){
      var t=this;
      t.showLogin=false;
    },

    //tab切换
    changeActive(type){
      var t=this;
      t.type=type
      t.page = 1
      t.loadingText = '加载中...'
      t.getList(type,t.page,10)
    },

    getCsrf(){
      var t=this;
      t.csrf=	document.getElementsByName("csrf-token")[0].content;
    },

    //获取列表
    loadMore(){
      var t = this
      if(!t.isLogin){
        return false
      }
      t.busy = true
      t.loadingText = '加载中...'
      t.page++
      t.getList(t.type,t.page,10);
    },
    getList(type,page,pageSize){
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      var t=this;
      if(page == 1){
        t.lists = []
        /*document.documentElement.scrollTop = 0
        window.pageYOffset = 0
        document.body.scrollTop =0*/
      }
      var data=new FormData();
      data.append('type',type);
      data.append('page',page);
      data.append('pageSize',pageSize);
      t.$http.post("/shop/credit-list",data,{
        	headers: {
						'X-CSRF-Token': t.csrf,
            'Content-Type': 'multipart/form-data'
					}
      }).then((res)=>{
        var res = res.data
        if(res.statusCode=='0'){
          t.virtual_money = res.content.virtual_money
          t.left = res.content.left
          t.next_year = res.content.next_year
          t.count = res.content.count
          t.total = res.content.total
          for(var i=0;i<res.content.list.length;i++){
            t.lists.push(res.content.list[i])
          }
          if(t.total<=t.page*10){//全部已加载
            t.loadingText = '—— 我是有底线的列表 ——'
            Indicator.close()
            return false
          }else{
            t.loadingText = '下拉加载更多'
          }
        }else{
          MessageBox({
            title: '温馨提示',
            message: res.message
          })
        }
        t.busy = false
        Indicator.close()
      }).catch((err)=>{
        MessageBox({
          title: '温馨提示',
          message: '系统繁忙，请稍后再试！'
        })
      })
    }
  },
  filters:{
    format_timestamp:function (timestamp,format) {
      return moment.unix(timestamp).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    format_date:function (date,format) {
      return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less">
  .mint-loadmore{
    overflow: scroll !important;
  }
  .mint-loadmore-bottom{
    margin-bottom:0 !important;
  }
  .mint-indicator{
    position: relative;
    z-index: 10000;
  }
  .load-more-normal {
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    font-size: .28rem;
  }
  .load-more-hide {
    height: 0;
  }
  #in-history{
    font-size: .3rem;
    .nav{
      width: 7.5rem;
      margin: 0 auto;
      height: .9rem;
      background: #fff;
      position: fixed;
      top: .9rem;
      left: 50%;
      margin-left: -3.75rem;
      z-index: 2;
      &.top{top: 0;}
      .type{
        display: flex;
        color: #757575;
        line-height: .9rem;
        text-align: center;
        li{
          flex: 1
        }
        .active{
          color: #ff9a26;
          border-bottom: 1px solid #ff9a26;
        }
      }
    }
    .tab{
      width: 7.5rem;
      margin: .9rem auto 0;
      .num-head{
        width: 7.5rem;
        height: 1.52rem;
        &.all{
          background: url("http://cdn1.damailicai.com/h5/integral/my_wdjf_banner_qb@2x.png") no-repeat;
          background-size: 100%;
        }
        &.obtain{
          background: url("http://cdn1.damailicai.com/h5/integral/my_wdjf_banner_hqjl@2x.png") no-repeat;
          background-size: 100%;
        }
        &.consume{
          background: url("http://cdn1.damailicai.com/h5/integral/my_wdjf_banner_xhjl@2x.png") no-repeat;
          background-size: 100%;
        }
        div{
          line-height: 1.52rem;
          text-align: center;
          font-size: .32rem;
          color: #FFF;
        }
        p{
          line-height: .36rem;
          text-align: center;
          font-size: .28rem;
          color: #FFF;
          &.mark{padding: .3rem 0 .1rem}
        }
      }
    }
    .list-box{
      width: 7.5rem;
      margin: 0 auto;
      &::-webkit-scrollbar {
        display:none;
      }
      ul{
        li{
          border-bottom: 1px solid #EEEEEE;
          padding: .22rem .3rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          .detail{
            p{
              color: #212121;
              line-height: .44rem;
              &.time{
                font-size: .26rem;
                color: #757575;
                line-height: .44rem;
              }
            }
          }
          .add{
            color: #ff9a26;
            margin-top: .26rem;
          }
          .reduce{
            color: #4a90e2;
            margin-top: .26rem;
          }
        }
      }
    }
  }
</style>
