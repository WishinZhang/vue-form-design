<template>
  <div :class="$style.box">
    <header :class="$style.header">
      <div :class="$style.logo">
        <h4>表单设计器</h4>
      </div>
    </header>
    <div :class="$style.main">
      <div :class="$style.left">
        <WidgetList></WidgetList>
      </div>
      <div :class="$style.center">
        <Center></Center>
      </div>
      <div :class="$style.right">
        <PropsConfig></PropsConfig>
      </div>
    </div>
  </div>
</template>

<script>
  import Center from "@/views/Center.vue";
  import WidgetList from "@component/WidgetList.vue";
  import PropsConfig from "@component/PropsConfig.vue";

  export default {
    name: "Home",
    components: { Center, WidgetList, PropsConfig },
    data() {
      return {
        list: []
      };
    }
  };
</script>

<style lang="less" module>
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
