<template>
  <section
    id="bg"
    style="background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580290044398&di=13c7158ab457a080553e287c10be9c7d&imgtype=0&src=http%3A%2F%2Fwww.mlhbth.com%2Fupload%2FAd%2F201407%2F176883601953d6fbe75acde.jpg) no-repeat"
  >
    <div id="login-box">
      <div id="box">
        <el-input
          placeholder="请选择用户名"
          prefix-icon="el-icon-s-custom"
          v-model="username"
          minlength="8"
          maxlength="16"
        ></el-input>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
          v-model="password"
          type="password"
          minlength="12"
          maxlength="20"
        ></el-input>
        <el-input placeholder="请输入验证码" v-model="upCode" maxlength="6"></el-input>
        <span @click="changeCode">{{ code }}</span>
        <el-button type="primary" @click="login" :disabled="canUseButton">登录</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { adminLogin, getCode } from "../../api";
export default {
  data() {
    return {
      username: "",
      password: "",
      code: "",
      upCode:""
    };
  },
  computed: {
      canUseButton(){
          return !(this.username.length != 0 && this.password.length != 0 && this.upCode.length != 0);
      }
  },
  async mounted() {
      let data = await getCode();
      this.code = data.data.code;
  },
  methods: {
    login() {
      let option = { username: this.username, password: this.password,code:this.upCode };
      adminLogin(option);
    },
    async changeCode(){
      let data = await getCode();
      this.code = data.data.code;
    }
  }
};
</script>

<style lang="scss" scoped>
#bg {
  height: 100%;
  #login-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 450px;
    height: 300px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    #box {
      width: 350px;
      height: 200px;
      margin: 30px auto;
      .el-input {
        margin: 10px 0 20px;
      }
      .el-input:last-of-type {
        width: 200px;
      }
      span {
        display: inline-block;
        width: 120px;
        margin-left: 30px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
        vertical-align: middle;
        line-height: 40px;
        border-radius: 6px;
        cursor: pointer;
        color: rgb(143, 109, 109);
        font-size: 18px;
      }
    }
  }
}
</style>