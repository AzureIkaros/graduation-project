<template>
  <section>
    <nav id="tab">
      <el-menu default-active="1" class="el-menu-demo" mode="vertical">
        <el-menu-item index="1">
            爬虫功能
        </el-menu-item>
        <el-menu-item index="3">
            检索大数据
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/admin/console/forgetPassword" active-class="active">忘记密码</router-link>
        </el-menu-item>
      </el-menu>
    </nav>
    <aside id="page">
      <router-view></router-view>
    </aside>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  height: 100%;
}
#tab {
  width: 15%;
  float: left;
}
#page {
  width: 85%;
  float: left;
  height: 100%;
}
.active{
    color:#409EFF;
}
a{
    color:#000;
}
</style>