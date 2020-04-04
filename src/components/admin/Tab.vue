<template>
  <section>
    <nav id="tab">
      <el-menu default-active="1" class="el-menu-demo" mode="vertical">
        <el-menu-item index="1">
          <router-link to="/admin/console/spider" active-class="active">爬虫功能</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/admin/console/forgetPassword" active-class="active">忘记密码</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <p @click="logout">退出</p>
        </el-menu-item>
      </el-menu>
    </nav>
    <aside id="page">
      <router-view></router-view>
    </aside>
  </section>
</template>

<script>
export default {
    methods: {
        logout(){
            if(confirm("确定退出吗")){
                window.sessionStorage.clear();
                console.log(this)
                this.$router.push({name:"admin"});
            }
        }
    },
};
</script>

<style lang="scss" scoped>
section {
  height: 100%;
  #tab {
    width: 15%;
    float: left;
  }
  #page {
    width: 85%;
    float: left;
    height: 100%;
  }
  .active {
    color: #409eff;
  }
  a {
    color: #000;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  p{
      width: 100%;
      height: 100%;
  }
}
</style>