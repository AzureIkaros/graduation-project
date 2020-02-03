<template>
  <div>
    <header id="header">
      <router-view name="header"></router-view>
    </header>
    <nav id="tab">
      <router-view name="tab"></router-view>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 60px;
}
div{
    height: 100%;
}
#tab{
    height: 100%;
}
</style>