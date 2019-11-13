<template>
  <div class="box">
    <header class="header">
      <div class="logo">
        <h4>表单设计器</h4>
      </div>
    </header>
    <div class="main">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  // components: {
  //   HelloWorld
  // }
};
</script>

<style lang="less">
  .box {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    .header {
      display: flex;
      height: 50px;
      background: linear-gradient(180deg, #0b6ade, #0654b3);
      .logo {
        flex: 0 1 300px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        h4 {
          height: 50px;
          line-height: 50px;
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: #eee;
        }
      }
    }
    .main {
      display: flex;
      height: calc(100% - 50px);
      padding: 0;
      background: #ffffff;
      .left {
        flex: 0 1 240px;
        height: 100%;
        border-right: 1px solid #ccc;
      }
      .center {
        flex: 1 1 auto;
        height: 100%;
      }
      .right {
        flex: 0 1 320px;
        height: 100%;
        border-left: 1px solid #ccc;
      }
    }
  }
</style>
