<template>
  <div id="box">
    <el-input v-model="oldPassWd" placeholder="请输入原密码"></el-input>
    <p>{{ tipOne }}</p>

    <el-input v-model="newPassWdFir" placeholder="请输入新密码"></el-input>
    <p>{{ getTipOne() }}</p>

    <el-input v-model="newPassWdSec" placeholder="请再次输入新密码" @input="getFlagTwo"></el-input>
    <p>{{ getTipTwo() }}</p>

    <el-button type="primary" :disabled="getFlag">修改密码</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassWd: "",
      newPassWdFir: "",
      newPassWdSec: "",
      tipThree: "",
      flagOne: true,
      flagTwo: true
    };
  },
  computed: {
    getFlag() {
      return this.flagOne || this.flagTwo;
    },
    getTipOne() {
      return () => {
        let numReg = /\d/g;
        let lowReg = /[a-z]/g;
        let upReg = /[A-Z]/g;
        let other = /[\W || _]/g;

        if (this.newPassWdFir != "") {
          if (
            numReg.test(this.newPassWdFir) &&
            lowReg.test(this.newPassWdFir) &&
            upReg.test(this.newPassWdFir) &&
            other.test(this.newPassWdFir) &&
            this.newPassWdFir.length >= 12
          ) {
            return "";
          } else {
            return "包括数字、大小写字母和其他符号,长度需大于12";
          }
        }
      };
    },
    getTipTwo() {
      return () => {
        if (this.newPassWdFir != "" && this.newPassWdSec != "") {
          if (this.newPassWdFir === this.newPassWdSec) {
            return "";
          } else {
            return "您输入的两次密码不一致,请验证后重新输入";
          }
        }
      };
    }
  },
  methods: {
    getFlagTwo() {
      this.newPassWdFir === this.newPassWdSec
        ? (this.flagTwo = false)
        : (this.flagTwo = true);
    },
    getFlagOne() {
      let numReg = /\d/g;
      let lowReg = /[a-z]/g;
      let upReg = /[A-Z]/g;
      let other = /[\W || _]/g;
      
      numReg.test(this.newPassWdFir) &&
      lowReg.test(this.newPassWdFir) &&
      upReg.test(this.newPassWdFir) &&
      other.test(this.newPassWdFir) &&
      this.newPassWdFir.length >= 12
        ? (this.flagOne = false)
        : (this.flagOne = true);
    }
  }
};
</script>

<style lang="scss" scoped>
#box {
  width: 300px;
  height: 400px;
  margin: 20vh auto;
  p {
    text-align: left;
    font-size: 12px;
    height: 12px;
  }
  .el-input {
    width: 300px;
    margin: 10px 0;
  }
  .el-button {
    margin: 10px 0;
  }
}
</style>