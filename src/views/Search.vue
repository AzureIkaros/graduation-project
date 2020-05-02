<template>
  <div class="main">
    <a href="http://localhost:8080/" style="background: url(img/search.png) no-repeat;"></a>
    <section class="search-box">
      <el-input v-model="inputData" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="submit">搜索</el-button>
    </section>
  </div>
</template>

<script>
import { search } from "../api"
export default {
    data(){
        return {
            inputData:""
        }
    },
    methods: {
        async submit(){
            if(this.inputData == ""){
                return;
            }
            let option = {  inputData:this.inputData };
            this.$router.push({name:"result",params:await search(option)});
            window.sessionStorage.setItem("key",this.inputData);
        }
    },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 160px auto;
  a{
      display: block;
      width: 473px;
      height: 100px;
      margin: 20px auto;
  }
  .search-box {
    width: 600px;
    margin: 0 auto;
    .el-input {
      width: 500px;
      float: left;
    }
    .el-button {
      float: left;
      width: 100px;
    }
  }
}
</style>