<template>
  <div class="main">
    <img src="img/search.png" alt="" />
    <section class="search-box">
      <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary">搜索</el-button>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 160px auto;
  img{
      margin-bottom: 30px;
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