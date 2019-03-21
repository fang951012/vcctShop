<template>
  <div id="login" class="mask">
    <div class="mask-cont login-box">
      <div class="title"><span class="tipsclose" @click="close">×</span>快速登录</div>
      <div class="form_ctrl">
        <div class="group">
          <input type="text" name="userName" v-model="userName" placeholder="请输入手机号码/用户名" autocomplete="off">
        </div>
        <div class="group">
          <input type="password" name="password" v-model="passWord" placeholder="请输入登录密码" autocomplete="off">
        </div>
        <div class="other_info">
          <a href="/home/resetpw">找回密码</a>
          <a href="/home/reg" class="rt" id="">注册专享红包</a>
        </div>
        <a href="javascript:void(0)" @click="login" class="box_btn login_btn">登录</a>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { MessageBox } from 'mint-ui'
export default {
  name:"login",
  data() {
    return {
      userName:"",
      passWord:"",
      csrf:""
    }
  },
  created(){
    var t=this;
    // t.csrf=document.cookie.split("HTTP_X_CSRF_Token")[1].split(";")[0];
  },
  methods:{
    getCsrf(){
    var t=this;
    t.csrf=	document.getElementsByName("csrf-token")[0].content;
    },
    //关闭弹窗
    close(){
      var t=this;
      t.$emit("close-login");//父组件自定义这个事件
    },
    //登录
    login(){
      var t=this;
      if(!t.userName||!t.passWord){
         MessageBox({
            title: '温馨提示',
            message: "请输入账号密码",
          });
          return false;
      }
      t.getCsrf();
      let data=new FormData();
      data.append('userName',t.userName);
      data.append('password',t.passWord);
      data.append('type','quick_login');
      t.$http.post("/home/login",data,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-Token': t.csrf,
        }
      }).then(function(res){
        // console.log(res);
        var res=res.data; 
        if(res.statusCode==0){
          t.$emit("login-success");//父组件定义登录成功事件
        }else{
          MessageBox({
            title: '温馨提示',
            message: res.message,
          });
        }
      }).catch(function(err){
          MessageBox({
            title: '温馨提示',
            message: '系统繁忙，请稍后再试',
          });
      })
    }
  }
}
</script>
<style  lang="less">
  #login{
    box-sizing: border-box;
    .login-box{
      width: 5.7rem;
      background: #f5f3e9;
      border-radius: 0.1rem;
      left: 50%;
      top: 50%;
      overflow: hidden;
      box-shadow: 0 0.03rem 0.1rem #f4d397;
      .title{
        height: .7rem;
        line-height: .7rem;
        position: relative;
        text-align: center;
        font-size: 0.32rem;
        background: #F39800;
        color: #fff;
        .tipsclose{
          position: absolute;
          right: .1rem;
          top: .1rem;
          width: .5rem;
          height: .5rem;
          line-height: .4rem;
          font-size: .6rem;
          cursor: pointer;
        }
      }
      .form_ctrl {
        padding: .35rem;
        .group{
          margin-bottom: .35rem;
          height: .7rem;
          overflow: hidden;
          input{
            float: left;
            width: 100%;
            height: .7rem;
            line-height: .7rem;
            font-size: .3rem;
            background: #fff;
            border: 0;
            border-top: 1px solid #e5e5e5;
            border-left: 0;
            color: #515151;
            padding: 0 0 0 .2rem;
          }
        }
        .other_info{
          margin-bottom: .35rem;
          font-size: .26rem;
          a{
            color: #f39800;
          }
          .rt{
            float: right;
            text-align: right;
          }
        }
        .box_btn{
          width: 100%;
          height: .7rem;
          background: #fdde5e;
          color: #fff;
          font-size: .32rem;
          line-height: .7rem;
          display: block;
          text-align: center;
          background: -moz-linear-gradient(top, #f5a521, #f29200);
          background: -webkit-gradient(linear, 0 0, 0 bottom, from(#f5a521), to(#f29200));
          border-radius: .04rem;
          -webkit-border-radius: .04rem;
          -moz-border-radius: .04rem;
          box-shadow: 0 0.04rem 0.1rem #f4d397;
        }
      }
    }
  }
</style>
