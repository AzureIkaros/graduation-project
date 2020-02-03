<template>
  <section>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
          <router-link to="/admin/oTable">回到首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-submenu index="3">
        <template slot="title">我的工作台</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
          <el-menu-item index="3-4-2">选项2</el-menu-item>
          <el-menu-item index="3-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="4" disabled>消息中心</el-menu-item>
      <el-menu-item index="5">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "2",
      activeIndex2: "2"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu{
    float: right;
    
}
section{
    width: 100%;
    height: 60px;
    background: rgb(84, 92, 100);
}
</style>