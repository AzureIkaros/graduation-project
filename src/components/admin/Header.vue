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
      <el-menu-item index="1">欢迎您,{{ getUsername() }}</el-menu-item>
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
  computed: {
      getUsername(){
          return ()=>{
              return window.sessionStorage.getItem("username")
          }
      }
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