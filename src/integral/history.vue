<template>
  <div id="history">
    <div class="cont">
      <common v-if="!isApp" :title="title" ></common>
      <ul class="type">
        <li class="tl">礼品名称</li>
        <li class="tc">消耗积分</li>
        <li class="tr">兑换时间</li>
      </ul>
      <div class="list">
          <ul class="detail">
            <li v-for="item in aList">
              <a :href="'#/his-detail?id='+item.order_id">
                <span class="tl" v-if="item.num>1" >{{item.title}}*{{item.num}}</span>
                <span class="tl" v-if="item.num==1" >{{item.title}}</span>
                <span class="tc" v-text="'-'+item.buy_price"></span>
                <span class="tr">
                  <p v-text="item.pay_time[0]"></p>
                  <p v-text="item.pay_time[1]"></p>
                </span>
              </a>
            </li>
          </ul> 
          <div class="load" v-text="statusText" @click="getMore"></div>
      </div>
    </div>
    <footer>  
      兑换最多保存50条记录
    </footer>
  </div>
</template>
<script type="text/javascript">
import commonHead from "../components/common-head"
import { MessageBox } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
  name:'history',
  components:{
    'common':commonHead
  },
  data() {
    return {
      title:"兑换记录",
      aList:[],//兑换记录列表
      nPage:1,//当前页码，加载第二页才调用这个
      isAll:false,//是否全部加载
      csrf:"",//csrf
      statusText:"点击加载更多",
      isApp:false,//是否app
    }
  },
  created(){
    var t=this;
    t.getList(t.nPage);
    t.judgeApp();
  },
  methods:{
    judgeApp(){
      var t=this;
      var ua = navigator.userAgent;
      var iPhone = ua.indexOf('iPhone') != -1;
      if(ua.indexOf("damailicai_app") != -1){
        t.isApp=true;
        if(iPhone) {
          var param = {
            showBack: true,
            title: '兑换记录',
          }
          try {
            JIClient.appSetHead(param);
          } catch(err) {};
        } else {//安卓
          try {
            JIClient.appSetHead(true,'兑换记录',"");
          } catch(err) {};
        }
      }else{
        t.isApp=false;
      }
    },
    getMore(){
      var t=this;
      t.getList(t.nPage);
    },
    getCsrf(){
      var t=this;
      t.csrf=	document.getElementsByName("csrf-token")[0].content;
    },

    //兑换记录
    getList(num){
      var t=this;
      if(t.statusText=="没有更多了哦"){
        return false;
      }
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      t.getCsrf();
      t.statusText="加载中";
      var data=new FormData();
      data.append('page',num);
      t.$http.post("/shop/exchange-list",data,{
        headers: {
          'X-CSRF-Token': t.csrf,
          'Content-Type': 'multipart/form-data',
        }
      }).then(function(res){
        var res=res.data;
        if(res.statusCode!=0){
          MessageBox({
            title: '温馨提示',
            message: res.message,
          });
        }else{
          for(var i=0;i<res.content.list.length;i++){
            t.aList.push(res.content.list[i]);
          }
          if(res.content.total<=(num*10)){
            t.statusText="没有更多了哦";
          }else{
            t.statusText="点击加载更多";
            t.nPage++;
          }
        }
        Indicator.close()
      }).catch(function(err){
        MessageBox({
          title: '温馨提示',
          message: '系统繁忙，请稍后再试！'
        })
      })
    }
  },

}
</script>
<style lang="less">
.mint-indicator{
  position: relative;
  z-index: 10000;
}
#history{
  .cont{
    padding-bottom: 1rem;
  }
  .type{
    height: .9rem;
    line-height: .9rem;
    display: flex;
    margin: 0 .3rem;
    border-bottom: 1px solid #EEEEEE;
    font-size: .3rem;
    color: #212121;
    li{
      flex: 1;
    }
  }
  .list{
    font-size: .26rem;
    height: 10.1rem;
    overflow: scroll;
  }
  .list::-webkit-scrollbar {
		display:none;
  }
  .load{
      height: 1rem;
      line-height: 1rem;
      font-size: .26rem;
      color: #757575;
      text-align: center;
  }
  .detail{
    li{
      a{
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #eeeeee;
        font-size: .26rem;
        color: #757575;
        display: flex;
        margin: 0 .3rem;
      }
      span{
        flex: 1;
        p{
          line-height: .5rem;
        }
      }
    }
  }
  footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1rem;
    line-height: 1rem;
    font-size: .26rem;
    color: #757575;
    text-align: center;
    background: #f3f3f3;
  }
}
</style>  
