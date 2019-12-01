<template>
  <div :class="$style.box" @mousemove="reiszeMove($event)" @mouseup="resizeEnd()">
    <header :class="$style.header">
      <div :class="$style.logo">
        <h4>表单设计器(Form Designer)</h4>
      </div>
    </header>
    <div :class="$style.main">
      <div :class="$style.left" :style="{'width': leftWidth + 'px'}">
        <WidgetList></WidgetList>
      </div>
      <div :class="$style.divider" @mousedown="reiszeStart('left', $event)"></div>
      <div :class="$style.center">
        <Center></Center>
      </div>
      <div :class="$style.divider" @mousedown="reiszeStart('right', $event)"></div>
      <div :class="$style.right" :style="{'width': rightWidth + 'px'}">
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
        list: [],
        leftWidth: 220,
        rightWidth: 350
      };
    },
    created() {
      this.initWidth = 0;
      this.resizeType = 'left';
      this.beginX = 0;
      this.canResize = false;
    },
    methods: {
      reiszeStart(type, event) {
        this.resizeType = type;
        this.initWidth = type === 'left' ? this.leftWidth : this.rightWidth;
        this.beginX = event.pageX;
        this.canResize = true;
      },
      reiszeMove(event) {
        if (this.canResize) {
          if (this.resizeType === 'left') {
            this.leftWidth = this.initWidth + event.pageX - this.beginX;
          } else {
            this.rightWidth = this.initWidth - event.pageX + this.beginX;
          }
        }
      },
      resizeEnd() {
        this.initWidth = 0;
        this.resizeType = 'left';
        this.beginX = 0;
        this.canResize = false;
      }
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
      margin: 0px auto;
      background: url(../assets/images/otis-redding.png) repeat,
                  linear-gradient(180deg, #0b6ade, #0e4890);
      transition: background-color 1.6s ease 0s;
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
        flex-grow: 0;
        width: 220px;
        min-width: 140px;
        max-width: 240px;
        height: 100%;
      }
      .center {
        flex-grow: 1;
        height: 100%;
      }
      .right {
        flex-grow: 0;
        width: 350px;
        min-width: 340px;
        max-width: 440px;
        height: 100%;
      }
      .divider {
        width: 1px;
        height: 100%;
        background: #ccc;
        cursor: ew-resize;
        &::before {
          content: '';
          display: block;
          position: relative;
          left: -1px;
          width: 3px;
          height: 100%;
        }
      }
    }
  }
</style>
